from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from fastapi.logger import logger
from app.auth import test_credentials, register_user, edit_user
from app.auth import get_current_user, get_user, verify_phone, verify_email
from app.documents import add_new_document, get_document, delete_document_by_id
from fastapi.security import OAuth2PasswordRequestForm
from app.database import Cursor
from fastapi import Depends, status
from app.models.api import Utente, RegistrazioneUtente, UtentePubblico
from app.models.api import DocumentoForm, Documento, TipoDocumento
from app.fare import register_fare, get_fare, get_fares, get_fares_by_user

router = APIRouter(prefix='/api/document', tags=['Document'])

@router.get("/")
async def fare_index_endpoint():
    return {"message": "Document endpoint is working. See the doc!"}

@router.post("/add", response_model=Documento)
async def add_document_endpoint(form_data: DocumentoForm, current_user: UtentePubblico = Depends(get_current_user)):
    add_new_document(form_data, current_user)
    return JSONResponse(content="ok", status_code=status.HTTP_201_CREATED)

# List of document
@router.get("/get", response_model=list[Documento])
async def get_document_endpoint(userId: int, current_user: UtentePubblico = Depends(get_current_user)):
    return get_document(userId)

@router.delete("/delete")
async def delete_document_endpoint(id: int, current_user: UtentePubblico = Depends(get_current_user)):
    deleted = delete_document_by_id(id, current_user.id)
    if deleted:
        return JSONResponse(content="ok", status_code=status.HTTP_200_OK)
    else:
        return JSONResponse(content="not found", status_code=status.HTTP_404_NOT_FOUND)
