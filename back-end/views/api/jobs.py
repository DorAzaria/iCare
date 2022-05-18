from django.conf import settings
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import reverse

import json

from datastore.drivers import jobs as driver_jobs

from shared import errors, keys

def error_handler(request):

    data = {
        keys.ERROR_CODE: errors.ERROR_GENERIC,
    }

    return JsonResponse(data)

def get_handler(request):

    parent_number = request.GET.get(keys.NUMBER_PARENT, None)
    jobs_data = driver_jobs.load_jobs(parent_number)
    return JsonResponse(jobs_data)

def post_handler(request):
    data = json.load(request)

    job_data = driver_jobs.save_job(data)
    if job_data is not None:
        return JsonResponse(job_data)

    return error_handler(request)

def request_handler(request):

    try:

        if request.method == 'POST':
            return post_handler(request)

        if request.method == 'GET':
            return get_handler(request)

    except Exception as ex:
        print(f'exception: { ex }')
        raise ex
        return error_handler(request)
