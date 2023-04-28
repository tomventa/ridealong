from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from fastapi.logger import logger
from app.auth import test_credentials, register_user, edit_user
from app.auth import get_current_user, get_user
from app.feedback import register_feedback, reply_feedback, get_user_feedback
from fastapi.security import OAuth2PasswordRequestForm
from app.database import Cursor
from fastapi import Depends, status
from app.models.api import Utente, RegistrazioneUtente, UtentePubblico
from app.models.api import Feedback, FeedbackForm, FeedbackReply

router = APIRouter(prefix='/api/feedback', tags=['Feedback'])


@router.get("/")
async def feedback_endpoint():
    return {"message": "Feedback endpoint is working"}


"""
Oauth authentication endpoint
"""
@router.post("/send")
async def edit(form_data: FeedbackForm, current_user: UtentePubblico = Depends(get_current_user)):
    register_feedback(current_user, form_data)
    return JSONResponse(content="ok", status_code=status.HTTP_201_CREATED)

@router.post("/reply")
async def reply(form_data: FeedbackReply, current_user: UtentePubblico = Depends(get_current_user)):
    reply_feedback(current_user, form_data)
    return JSONResponse(content="ok", status_code=status.HTTP_201_CREATED)

@router.post("/get/<id>")
async def get_feedback(id: int, current_user: UtentePubblico = Depends(get_current_user)):
    return get_user_feedback(id)