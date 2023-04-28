from datetime import datetime, timedelta
from typing import Union
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, status, HTTPException
from fastapi.logger import logger
from app.models.api import UtentePubblico, Utente, RegistrazioneUtente
from app.models.api import FeedbackForm, FeedbackReply
from app.database import Cursor


def register_feedback(utente: UtentePubblico, feedback: FeedbackForm) -> None:
    """Register a new feedback

    Args:
        utente (UtentePubblico): User data. See RegistrationUser type in models.api
        feedback (FeedbackForm): Feedback data. See FeedbackForm type in models.api

    Raises:
        HTTPException: TODO
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "INSERT INTO feedback (codice_utente, per_utente, codice_tratta, stelle_generale, stelle_tempistiche, stelle_autista, stelle_veicolo, stelle_esperienza_complessiva, stelle_sicurezza_alla_guida, segnala_percorso_non_ottimale, recensione, data_feedback) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, DATE(NOW()))",
                (
                    utente.id, feedback.per_utente, feedback.codice_tratta, feedback.stelle_generale, feedback.stelle_tempistiche, feedback.stelle_autista, feedback.stelle_veicolo, feedback.stelle_esperienza_complessiva, feedback.stelle_sicurezza_alla_guida, feedback.segnala_percorso_non_ottimale, feedback.recensione
                )
            )
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="feedback_insert_failed")

def reply_feedback(utente: UtentePubblico, feedback: FeedbackReply):
    """Reply to a feedback

    Args:
        utente (UtentePubblico): User data. See RegistrationUser type in models.api
        feedback (FeedbackReply): FeedbackReply data. See FeedbackForm type in models.api

    Raises:
        HTTPException: TODO
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "UPDATE feedback SET risposta = ?, data_risposta = TIME(NOW()) WHERE id = ?",
                (
                    feedback.risposta, feedback.id
                    # TODO: #SECURITY add WHERE per_utente = ? -> utente.id
                )
            )
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="feedback_insert_failed")
    
def get_user_feedback(userId: int):
    """Get feedbacks for a user
    
    Args:
        id (int): User incremental ID

    Raises:
        HTTPException: 500
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "SELECT * FROM feedback WHERE per_utente = ?",
                (userId,)
            )
            feedbacks = cur.fetchall()
            return feedbacks
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="feedback_get_failed")