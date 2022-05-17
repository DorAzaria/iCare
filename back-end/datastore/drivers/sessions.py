from django.contrib.sessions.backends.db import SessionStore

from datastore.models.sessions import Session

session_store = SessionStore()

def create_session(user):
    session_store.create()
    key = session_store.session_key

    session = Session()
    session.user = user
    session.key = key
    session.save()

    return key
