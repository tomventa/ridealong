from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from fastapi.logger import logger
from app.auth import test_credentials, register_user, edit_user
from app.auth import get_current_user, get_user, verify_phone, verify_email
from fastapi.security import OAuth2PasswordRequestForm
from app.database import Cursor
from fastapi import Depends, status
from app.models.api import Utente, RegistrazioneUtente, UtentePubblico

router = APIRouter(prefix='/api/account', tags=['Account'])


@router.get("/", response_model=UtentePubblico)
async def get_logged_user(current_user: UtentePubblico = Depends(get_current_user)):
    return current_user


"""
Oauth authentication endpoint
"""
@router.post("/auth")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    jwt = test_credentials(form_data.username, form_data.password)
    return {"access_token": jwt, "token_type": "bearer"}

@router.post("/register")
async def register(form_data: RegistrazioneUtente):
    register_user(form_data)
    return JSONResponse(content="ok", status_code=status.HTTP_201_CREATED)


@router.post("/edit", response_model=UtentePubblico)
async def edit(form_data: RegistrazioneUtente, current_user: UtentePubblico = Depends(get_current_user)):
    edit_user(current_user.id, form_data)
    return get_user(current_user.id)

@router.get("/verify/phone/<token>", response_model=bool)
async def verify_phone_number(token: str, current_user: UtentePubblico = Depends(get_current_user)):
    return verify_phone(token, current_user)

@router.get("/verify/email/<token>", response_model=bool)
async def verify_email_address(token: str, current_user: UtentePubblico = Depends(get_current_user)):
    return verify_email(token, current_user)
