from datetime import datetime, timedelta
from typing import Union
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, status, HTTPException
from fastapi.logger import logger
from app.models.api import UtentePubblico, Utente, RegistrazioneUtente
from app.models.api import Tariffa, TariffaFull,TariffaForm
from app.database import Cursor

def register_fare(form_data: TariffaForm, current_user: UtentePubblico):
    """Register a new fare

    Args:
        form_data (Tariffa): Fare data. See Tariffa type in models.api
        current_user (UtentePubblico): User data. See UtentePubblico type in models.api

    Raises:
        HTTPException: TODO
    """
    try:
        with Cursor() as cur:
            cur.execute(
                """
                    INSERT INTO tariffe (
                        `codice_utente`, `abilitata`, `minimo_km`, `massimo_km`, 
                        `massimo_minuti`, `minimo_tariffa`, `massimo_tariffa`, 
                        `tariffa_partenza`, `tariffa_per_km`, `permetti_contrattazione`, 
                        `permetti_sconto`
                    ) VALUES (
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                    )""",
                (
                    current_user.id, form_data.abilitata, form_data.minimo_km, 
                    form_data.massimo_km, form_data.massimo_minuti, form_data.minimo_tariffa, 
                    form_data.massimo_tariffa, form_data.tariffa_partenza, 
                    form_data.tariffa_per_km, form_data.permetti_contrattazione, 
                    form_data.permetti_sconto
                )
            )
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="fare_insert_failed")
    
def get_fares():
    """Get all fares

    Raises:
        HTTPException: TODO

    Returns:
        List[TariffaFull]: Fares data. See TariffaFull type in models.api
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "SELECT * FROM tariffe"
            )
            fares = cur.fetchall()
            return [TariffaFull(**fare) for fare in fares]
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="fare_select_failed")

def get_fare(id: int):
    """Get fare by id

    Args:
        id (int): Fare id

    Raises:
        HTTPException: TODO

    Returns:
        TariffaFull: Fare data. See TariffaFull type in models.api
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "SELECT * FROM tariffe WHERE id_tariffa = ?",
                (
                    id,
                )
            )
            fare = cur.fetchone()
            if fare is None:
                raise HTTPException(status_code=404, detail="fare_not_found")
            return TariffaFull(**fare)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="fare_select_failed")
    
def get_fares_by_user(userId: int):
    """Get fares by user

    Args:
        userId (int): User incremental ID

    Raises:
        HTTPException: TODO

    Returns:
        List[TariffaFull]: Fares data. See TariffaFull type in models.api
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "SELECT * FROM tariffe WHERE codice_utente = ?",
                (
                    userId,
                )
            )
            fares = cur.fetchall()
            return [TariffaFull(**fare) for fare in fares]
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="fare_select_failed")