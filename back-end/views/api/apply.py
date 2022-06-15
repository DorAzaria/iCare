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

def get_handler(request):

    number_user = request.GET.get(keys.NUMBER_USER, None)
    registration_type = request.GET.get(keys.REGISTRATION_TYPE, None)

    if number_user is not None and registration_type is not None:
        applications_data = driver_applications.load_applications(
            number_user,
            registration_type,
        )

        return JsonResponse(applications_data, safe=False)

    return error_handler(request)

def post_handler(request):
    data = json.load(request)

    apply_data = driver_applications.save_application(data)
    if apply_data is not None:
        return JsonResponse(apply_data, safe=False)

    return error_handler(request)

def request_handler(request):

    try:

        if request.method == 'GET':
            return get_handler(request)

        if request.method == 'POST':
            return post_handler(request)

    except Exception as ex:
        raise ex
        return error_handler(request)
