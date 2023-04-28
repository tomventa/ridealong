from fastapi import FastAPI, Depends, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.logger import logger
from .routers import account, feedback, position, fare, routes, documents
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse 

description="""
### Backend server for the Ridealong school project!
"""


app = FastAPI(
    title="API for Ridealong",
    description=description,
    version="1.7.6",
    contact={
      "name": "Tommaso Ventafridda",
      "url": "https://github.com/tomventa/ridealong"
    },
)


# During development, the webserver runs on a separate origin
# therefore a CORS configuration on the api server is required.
# In production the api server will be behind the same
# reverse-proxy serving the static website, so there won't be any CORS issue
origins = [
    "http://carpool.local",
    "http://pctom2.route3.ipv4.dcforwarder.local.dns.tomh.it",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(account.router)
app.include_router(feedback.router)
app.include_router(position.router)
app.include_router(fare.router)
app.include_router(routes.router)
app.include_router(documents.router)

#@app.get("/")
#async def read_index():
#    return FileResponse('/index.html', media_type='text/html')

#app.mount("/", StaticFiles(directory="web"), name="web")

app.mount("/", StaticFiles(directory="web", html=True), name="index.html")