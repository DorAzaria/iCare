from django.conf import settings
from datastore.models.users import User
from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import reverse
from datastore.models.hearts import Heart
import json


from shared import errors, keys

def error_handler(request):

    data = {
        keys.ERROR_CODE: errors.ERROR_GENERIC,
    }

    return JsonResponse(data, safe=False)

def post_handler(request):
    data =  request.POST['data']
    data = json.loads(data)
    jobNumber = data['jobNumber']
    user_number = data['user_number']
    status = data['status']
    
    if Heart.objects.filter(job_id=jobNumber, user_id=user_number).exists():
        heart = Heart.objects.get(job_id=jobNumber, user_id=user_number)
        heart.flag = status
        heart.save()
    else:
        
        Heart.objects.create(
            job_id=jobNumber,
            user_id=user_number,
            flag = status
        )

    heart_data = {
        keys.NUMBER_JOB: jobNumber,
        keys.ERROR_CODE: errors.ERROR_NONE,
    }

    return JsonResponse(heart_data)

def request_handler(request):
    # try:

    if request.method == 'POST':
        
        return post_handler(request)

    # except Exception as ex:
    #     return error_handler(request)