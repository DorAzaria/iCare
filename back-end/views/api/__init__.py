from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.urls import reverse

from . import jobs, log_in, register

API_ROUTES = {
    '/api/register': register.request_handler,
    '/api/log-in': log_in.request_handler,
    '/api/jobs': jobs.request_handler,
}

def request_handler(request):

    route_handler = API_ROUTES.get(request.path, None)
    if route_handler is not None:
        return route_handler(request)
