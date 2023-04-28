from datetime import datetime, timedelta
from typing import Union
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, status, HTTPException
from fastapi.logger import logger
from app.models.api import UtentePubblico, Utente, RegistrazioneUtente
from app.database import Cursor
import secrets


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/account/auth")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# openssl rand -hex 32
# TODO: Env variable
SECRET_KEY = "274563133ba6dcf8944e59c4a1b502ac78a042d2119eb4c8d3ec1fefe71d69bd"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify if a plaintext password matches the database hash

    Args:
        plain_password (str): Plain text password
        hashed_password (str): Hash as bcrypt. See pwd_context

    Returns:
        bool: Password is correct
    """
    return pwd_context.verify(hashed_password, plain_password)

def get_password_hash(password: str) -> str:
    """Get password hash from a plaintext one

    Args:
        password (str): Plaintext password

    Returns:
        str: Hashed password as bcrypt. See pwd_context
    """
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None) -> str:
    """Create access token (JWT)

    Args:
        data (dict): Dict data to encode and sign
        expires_delta (Union[timedelta, None], optional): Expiration. Defaults to None.

    Returns:
        str: JWT string
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def test_credentials(email: str, password: str) -> str:
    """Test credentials in a login form

    Args:
        email (str): Email
        password (str): Password in plaintext

    Raises:
        HTTPException: TODO
        HTTPException: TODO
        HTTPException: TODO

    Returns:
        str: Access token as JWT
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "SELECT id, password FROM utenti WHERE email=?", (email,))
            account = cur.fetchone()
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="login_failed")
    # Check if account is found
    if account is None:
        raise HTTPException(status_code=400, detail="user_not_found")
    # Check user password
    if not verify_password(account["password"], password):
        raise HTTPException(status_code=400, detail="wrong_password")
    # prepare response data
    responseJSON = {"id": account["id"]}
    return create_access_token(
        responseJSON, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

def register_user(user: RegistrazioneUtente) -> None:
    """Register a new user

    Args:
        user (RegistrationUser): User data. See RegistrationUser type in models.api

    Raises:
        HTTPException: TODO
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "INSERT INTO utenti (nome, cognome, email, cellulare, password, data_di_nascita, data_di_registrazione, token_email, token_cellulare) VALUES (?, ?, ?, ?, ?, ?, DATE(NOW()), ?, ?)", 
                (
                    user.nome, user.cognome, user.email, user.cellulare, 
                    get_password_hash(user.password), user.data_di_nascita,
                    # generate verification tokens
                    secrets.token_hex(16), secrets.token_hex(8)
                )
            )
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="registration_failed")

def get_user(id: int) -> UtentePubblico:
    """Get an user from its internal ID

    Args:
        id (int): User incremental ID

    Raises:
        HTTPException: TODO
        HTTPException: TODO

    Returns:
        User: User data. See User type in models.api
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "SELECT id,nome,cognome,data_di_nascita,data_di_registrazione,email,cellulare FROM utenti WHERE id=?", (id,))
            account = cur.fetchone()
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="user_fetch_fail")
    # Check if account is found
    if account is None:
        raise HTTPException(status_code=400, detail="user_not_found")
    # 
    return UtentePubblico(**account)

def decode_token(token: str) -> UtentePubblico:
    """Decode a session JWT token and return the current User
    Please see get_current_user for a safe use

    Args:
        token (str): JWT string

    Raises:
        HTTPException: TODO
        HTTPException: TODO

    Returns:
        User: User data. See User type in models.api
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: int = payload.get("id")
        if id is None:
            raise HTTPException(status_code=400, detail="insufficient_ivan_skills")
    except JWTError:
        raise HTTPException(status_code=400, detail="insufficient_ivan_skills")
    user = get_user(id)
    return user

async def get_current_user(token: str = Depends(oauth2_scheme)) -> UtentePubblico:
    """Decode a JWT token and return a User
    A wrapper of decode_token, but it checks for the success of the JWT decoder.

    Args:
        token (str, optional): Session JWT. Defaults to Depends(oauth2_scheme).

    Raises:
        HTTPException: TODO

    Returns:
        User: User data. See User type in models.api
    """
    user = decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

def edit_user(id:int, profile: RegistrazioneUtente) -> None:
    """Edit a user profile

    Args:
        id (int): User incremental ID
        profile (Profile): Profile data.
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "UPDATE utenti SET nome=?, cognome=?, email=?, cellulare=? WHERE id=?",
                (profile.nome, profile.cognome, profile.email, profile.cellulare, id)
            )
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="user_edit_fail")

def verify_phone(token: str, profile: UtentePubblico) -> bool:
    """Verify phone number with token

    Args:
        token (str): Secret random token
        profile (UtentePubblico): Profile data    
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "UPDATE utenti SET cellulare_verificato=1 WHERE id=? AND token_cellulare=? AND cellulare_verificato=0",
                (profile.id, token)
            )
            return cur.rowcount == 1
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="user_edit_fail")

def verify_email(token: str, profile: UtentePubblico) -> bool:
    """Verify email with token

    Args:
        token (str): Secret random token
        profile (UtentePubblico): Profile data    
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "UPDATE utenti SET email_verificata=1 WHERE id=? AND token_email=? AND email_verificata=0",
                (profile.id, token)
            )
            return cur.rowcount == 1
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="user_edit_fail")

    