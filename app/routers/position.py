from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from fastapi.logger import logger
from app.auth import test_credentials, register_user, edit_user
from app.auth import get_current_user, get_user
from app.position import register_position, get_user_position
from fastapi.security import OAuth2PasswordRequestForm
from app.database import Cursor
from fastapi import Depends, status
from app.models.api import Utente, RegistrazioneUtente, UtentePubblico
from app.models.api import Geolocalizzazione, GeolocalizzazioneFull

router = APIRouter(prefix='/api/position', tags=['Position'])

@router.get("/")
async def position_index_endpoint():
    return {"message": "Position endpoint is working. See the doc!"}

@router.post("/send")
async def send_current_coordinates(geo_data: Geolocalizzazione, current_user: UtentePubblico = Depends(get_current_user)):
    register_position(geo_data, current_user)
    return JSONResponse(content="ok", status_code=status.HTTP_201_CREATED)

@router.get("/history/<id>")
async def get_user_coordinates(user_id: int, current_user: UtentePubblico = Depends(get_current_user)):
    return get_user_position(user_id)