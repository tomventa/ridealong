from datetime import datetime, timedelta
from typing import Union
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, status, HTTPException
from fastapi.logger import logger
from app.models.api import UtentePubblico, Utente, RegistrazioneUtente
from app.models.api import Geolocalizzazione, GeolocalizzazioneFull
from app.database import Cursor


def register_position(geo_data: Geolocalizzazione, utente: UtentePubblico) -> None:
    """Register the shortpolling geoposition data

    Args:
        geo_data (Geolocalizzazione): Localization data. See Geolocalizzazione type in models.api
        utente (UtentePubblico): User data. See RegistrationUser type in models.api

    Raises:
        HTTPException: TODO
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "INSERT INTO registro_posizione (`codice_utente`, `lat`, `long`, `precisione_metri`) VALUES (?, ?, ?, ?)",
                (
                    utente.id, geo_data.lat, geo_data.long, geo_data.precisione_metri
                )
            )
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="geo_insert_failed")

    
def get_user_position(userId: int):
    """Get feedbacks for a user
    
    Args:
        id (int): User incremental ID

    Raises:
        HTTPException: 500
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "SELECT * FROM registro_posizione WHERE codice_utente = ? ORDER BY id DESC LIMIT 1",
                (userId,)
            )
            feedback = cur.fetchone()
            return feedback
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="geouser_get_failed")
