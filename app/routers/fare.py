from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from fastapi.logger import logger
from app.auth import test_credentials, register_user, edit_user
from app.auth import get_current_user, get_user, verify_phone, verify_email
from fastapi.security import OAuth2PasswordRequestForm
from app.database import Cursor
from fastapi import Depends, status
from app.models.api import Utente, RegistrazioneUtente, UtentePubblico
from app.models.api import Tariffa, TariffaFull, TariffaForm
from app.fare import register_fare, get_fare, get_fares, get_fares_by_user

router = APIRouter(prefix='/api/fare', tags=['Fare'])

@router.get("/")
async def fare_index_endpoint():
    return {"message": "Fare endpoint is working. See the doc!"}

@router.post("/add/")
async def add_fare_endpoint(form_data: TariffaForm, current_user: UtentePubblico = Depends(get_current_user)):
    register_fare(form_data, current_user)
    return JSONResponse(content="ok", status_code=status.HTTP_201_CREATED)

@router.get("/get/<id>", response_model=TariffaFull)
async def get_fare_endpoint(id: int, current_user: UtentePubblico = Depends(get_current_user)):
    return get_fare(id)

@router.get("/get/all", response_model=list[TariffaFull])
async def get_all_fares_endpoint(current_user: UtentePubblico = Depends(get_current_user)):
    return get_fares()

@router.get("/get/by-user/<id>", response_model=list[TariffaFull])
async def get_fares_by_user_endpoint(id: int, current_user: UtentePubblico = Depends(get_current_user)):
    return get_fares_by_user(id)

