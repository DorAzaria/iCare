from django.conf import settings
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import reverse

import json

from datastore.drivers import sessions as driver_sessions

from shared import errors, keys

def error_handler(request):

    data = {
        keys.ERROR_CODE: errors.ERROR_GENERIC,
    }

    return JsonResponse(data)

def request_handler(request):

    try:

        if request.method != 'POST':
            return error_handler(request)

        data = json.load(request)
        username = data[keys.USERNAME]
        password = data[keys.PASSWORD]

        user = authenticate(request, username=username, password=password)
        if user is not None:
            session_key = driver_sessions.create_session(username)

            data = {
                keys.ERROR_CODE: errors.ERROR_NONE,
                keys.FIRST_NAME: user.first_name,
                keys.LAST_NAME: user.last_name,
                keys.SESSION: session_key,
                keys.USERNAME: user.username,
            }

            return JsonResponse(data)

        return error_handler(request)

    except Exception as ex:
        print(f'exception: { ex }')
        return error_handler(request)
