from django.conf import settings
from datastore.models.users import User
from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import reverse

import json

from numpy import number
from django.core import serializers
from datastore.models.schedules import Schedule

from shared import errors, keys

def error_handler(request):

    data = {
        keys.ERROR_CODE: errors.ERROR_GENERIC,
    }

    return JsonResponse(data)

def load_schedule(user_number):
    schedule = Schedule.objects.filter(user_number__exact=user_number).first()
    schedule_data = serializers.serialize('json', [ schedule, ])
    return schedule_data

def get_handler(request):
    user_number = request.GET.get(keys.NUMBER_USER, None)

    if  user_number is not None:
        schedule_data = load_schedule(user_number)
        return JsonResponse(schedule_data, safe=False)

def request_handler(request):
    try:
        if request.method == 'GET':
            return get_handler(request)

    except Exception as ex:
        print(f'exception: {ex}')
        return error_handler(request)
