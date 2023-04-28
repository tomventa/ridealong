from datetime import datetime, timedelta
from typing import Union
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, status, HTTPException
from fastapi.logger import logger
from app.models.api import UtentePubblico, Utente, RegistrazioneUtente
from app.models.api import Geolocalizzazione, GeolocalizzazioneFull
from app.models.api import RouteBookingRequest
from app.database import Cursor

 