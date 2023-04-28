from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from fastapi.logger import logger
from app.auth import get_current_user, get_user
from app.position import register_position, get_user_position
from fastapi.security import OAuth2PasswordRequestForm
from app.database import Cursor
from fastapi import Depends, status
from app.models.api import Utente, UtentePubblico, RouteBookingRequest
from app.models.api import Geolocalizzazione, GeolocalizzazioneFull

router = APIRouter(prefix='/api/routes', tags=['Routes'])

@router.get("/")
async def routes_index_endpoint():
    return {"message": "Routes endpoint is working. See the doc!"}

@router.post("/preview")
async def get_route_preview(booking: RouteBookingRequest, current_user: UtentePubblico = Depends(get_current_user)):
    register_position(booking, current_user)
    return JSONResponse(content="ok", status_code=status.HTTP_201_CREATED)

@router.post("/book/<fare>")
async def book_fare_by_id(fare: int, booking: RouteBookingRequest, current_user: UtentePubblico = Depends(get_current_user)):
    return 0