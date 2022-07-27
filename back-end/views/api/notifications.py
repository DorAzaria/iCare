from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import reverse
from datastore.models.users import User
from datastore.models.registrations import Registration
import json
from notifications import models as Notification

from shared import errors, keys

def error_handler(request):

    data = {
        keys.ERROR_CODE: errors.ERROR_GENERIC,
    }

    return JsonResponse(data, safe=False)

def get_handler(request):

    user_number = request.GET.get(keys.NUMBER_USER, None)
    user = User.objects.get(id=user_number)
    all_data = []
    for notificate in user.notifications.all():
        sender = Registration.objects.get(user_number=notificate.actor_object_id)
        if sender.avatar:
            image = sender.avatar.url
        else: 
            image = 'logo.png'
        note = {
            'receivedTime': notificate.timestamp,
            'message': notificate.description,
            'image': image
        }
        all_data.append(note)
    return JsonResponse(all_data, safe=False)


def request_handler(request):

    try:

        if request.method == 'GET':
            return get_handler(request)

    except Exception as ex:
        return error_handler(request)
