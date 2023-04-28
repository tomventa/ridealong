from typing import NamedTuple, Dict, List, Optional, Any, Union
from pydantic import BaseModel, Field, constr
from datetime import date, datetime, timedelta, timezone, time

# General purpose
class Point(NamedTuple):
    x: int
    y: int


# Account
class UtentePubblico(BaseModel):
  id: int
  nome: str
  cognome: str
  data_di_nascita: Union[date, None] = None
  data_di_registrazione: Union[date, None] = None
  email: str
  cellulare: str

class Utente(UtentePubblico):
  token_email: str
  token_cellulare: str
  abilitato: bool
  password: str
  email_verificata: bool
  cellulare_verificato: bool

class RegistrazioneUtente(BaseModel):
  nome: str
  cognome: str
  email: str
  cellulare: str
  password: str
  data_di_nascita: Union[date, None] = None
  
class FeedbackForm(BaseModel):
  per_utente: int
  codice_tratta: int
  stelle_generale: int
  stelle_tempistiche: int
  stelle_autista: int
  stelle_veicolo: int
  stelle_esperienza_complessiva: int
  stelle_sicurezza_alla_guida: int
  segnala_percorso_non_ottimale: bool = False
  recensione: str


class Feedback(FeedbackForm):
  id: int
  codice_utente: int
  risposta: str
  data_feedback: date
  data_risposta: Union[date, None] = None

class FeedbackReply(BaseModel):
  id: int
  risposta: str

class Geolocalizzazione(BaseModel):
  long: float
  lat: float
  precisione_metri: float = 5

class GeolocalizzazioneFull(Geolocalizzazione):
  id: int
  codice_utente: int
  ora: time

class RouteBookingRequest(BaseModel):
  my_location: Geolocalizzazione
  my_destination: Geolocalizzazione
  my_departure_time: datetime
  budget: float


class Tariffa(BaseModel):
  codice_utente: int
  abilitata: bool = True
  minimo_km: int = 1
  massimo_km: int = 1000
  massimo_minuti: int = 240
  minimo_tariffa: float = 2.50
  massimo_tariffa: float = 500
  tariffa_partenza: float = 2.50
  tariffa_per_km: float = 0.4
  permetti_contrattazione: bool = True
  permetti_sconto: bool = True

class TariffaForm(BaseModel):
  abilitata: bool = True
  minimo_km: int = 1
  massimo_km: int = 1000
  massimo_minuti: int = 240
  minimo_tariffa: float = 2.50
  massimo_tariffa: float = 500
  tariffa_partenza: float = 2.50
  tariffa_per_km: float = 0.4
  permetti_contrattazione: bool = True
  permetti_sconto: bool = True

class TariffaFull(Tariffa):
  id_tariffa: int


class Autista(Utente):
   enabled_as_driver: bool
   date_of_enable_as_driver: int
   date_of_next_review: int

class TipoDocumento(BaseModel):
  id: int
  nome: str
  descrizione: str
  fronte_richiesto: bool = True
  retro_richiesto: bool = True
  ha_scadenza: bool = False
  ha_foto_intestatario: bool = False
  ha_validita_identificativa: bool = True


class Documento(TipoDocumento):
  id_documento: int
  codice_utente: int
  tipo_documento: int
  data_caricamento: date
  data_revisione: date
  verificato: bool = False
  note_utente: Union[str, None]
  note_interne_staff: Union[str, None]
  nome_file_originale: Union[str, None]

class DocumentoForm(BaseModel):
  codice_utente: int
  tipo_documento: int
  data_caricamento: date
  data_revisione: int
  verificato: bool = False
  note_utente: Union[str, None]
  nome_file_originale: Union[str, None]

class RegistroPosizione(BaseModel):
  id: int
  user_id: int
  date: int
  long: float
  lat: float
  accuracy: float = 20

class Veicolo(BaseModel):
  vin: str
  plate: str
  user_id: int
  brand: str
  model: str
  immatriulation_date: int
  upload_date: int
  description: str
  seats: int = 5
  is_eletric: bool = False
  displacement: int = 0
  power: int = 11
  date_next_maintenance: int
  date_expire_insurance: int


# Generic / Other
class Success(BaseModel):
  success: bool
  notes: Union[None, str]
  error: Union[None, str]
