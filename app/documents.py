from datetime import datetime, timedelta
from typing import Union
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, status, HTTPException
from fastapi.logger import logger
from app.models.api import UtentePubblico, Utente, RegistrazioneUtente
from app.models.api import TipoDocumento, Documento, DocumentoForm
from app.database import Cursor

def add_new_document(document: DocumentoForm, current_user: UtentePubblico):
    """Register a new document

    Args:
        document (DocumentoForm): Document data. See DocumentoForm type in models.api

    Raises:
        HTTPException: TODO
    """
    try:
        with Cursor() as cur:
            cur.execute(
                """
                    INSERT INTO documenti (
                        `codice_utente`, `tipo_documento`, `data_caricamento`,
                        `verificato`, `note_utente`, `nome_file_originale`
                    ) VALUES (
                        ?, ?, DATE(NOW()), 
                        0, ?, "documento.pdf"
                    )""",
                (
                    current_user.id, document.tipo_documento, document.note_utente,
                )
            )
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="document_insert_failed")
    
def get_document(userId: int):
    """Get documents for a user

    Args:
        userId (int): User id

    Returns:
        List[Documento]: List of documents
    """
    try:
        with Cursor() as cur:
            cur.execute(
                """
                    SELECT *
                    FROM documenti
                    JOIN tipi_documenti ON documenti.tipo_documento = tipi_documenti.id
                    WHERE codice_utente = ?
                """,
                (userId,)
            )
            rows = cur.fetchall()
            out = []
            for row in rows:
                out.append(Documento(**row))
            return out
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="document_select_failed")
    
def delete_document_by_id(documentId: int, userId: int):
    """Delete a document by id

    Args:
        documentId (int): Document id

    Raises:
        HTTPException: TODO
    """
    try:
        with Cursor() as cur:
            cur.execute(
                "DELETE FROM documenti WHERE id = ? AND codice_utente = ?",
                (documentId, userId, )
            )
            return cur.rowcount > 0
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="document_delete_failed")