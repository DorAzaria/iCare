from django.conf import settings
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import reverse

import json

from datastore.drivers import applications as driver_applications

from shared import errors, keys

def error_handler(request):

    data = {
        keys.ERROR_CODE: errors.ERROR_GENERIC,
    }

    return JsonResponse(data, safe=False)

<<<<<<< HEAD
def get_handler(request):

    parent_number = request.GET.get(keys.NUMBER_PARENT, None)

    if parent_number is not None:
        applications_data = driver_applications.load_applications(parent_number)
        return JsonResponse(applications_data, safe=False)

    return error_handler(request)

=======
>>>>>>> f90934e74bea4c80cdfc1ca59ce3985dc9d34365
def post_handler(request):
    data = json.load(request)

    apply_data = driver_applications.save_application(data)
    if apply_data is not None:
        return JsonResponse(apply_data, safe=False)

    return error_handler(request)

def request_handler(request):

    try:

<<<<<<< HEAD
        if request.method == 'GET':
            return get_handler(request)

=======
>>>>>>> f90934e74bea4c80cdfc1ca59ce3985dc9d34365
        if request.method == 'POST':
            return post_handler(request)

    except Exception as ex:
        return error_handler(request)
