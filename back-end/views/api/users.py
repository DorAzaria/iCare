import email
from django.conf import settings
from datastore.models.users import User
from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import reverse
from datastore.models.registrations import Registration
from datastore.models.schedules import Schedule
import json
from notifications.signals import notify
from datastore.drivers import registrations as driver_regs

from shared import errors, keys

def error_handler(request):

    data = {
        keys.ERROR_CODE: errors.ERROR_GENERIC,
    }

    return JsonResponse(data, safe=False)

def get_handler(request):
    reg_type = request.GET.get(keys.REGISTRATION_TYPE, None)
    user_number = request.GET.get(keys.NUMBER_USER, None)
    if reg_type is not None:
        sitter_data = driver_regs.load_users(reg_type)
        return JsonResponse(sitter_data, safe=False)
    if  user_number is not None:
        sitter_data = driver_regs.load_single_user(user_number)
        return JsonResponse(sitter_data, safe=False)

def post_handler(request):
    data = json.load(request)

    job_data = driver_regs.update_user(data)
    if job_data is not None:
        return JsonResponse(job_data, safe=False)

    return error_handler(request)

def request_handler(request):
    try:

        if request.method == 'POST':
            return post_handler(request)

        if request.method == 'GET':
            return get_handler(request)

    except Exception as ex:
        return error_handler(request)

def get_profile_handler(request):
    user_number = request.GET.get(keys.NUMBER_USER, None)
    if  user_number is not None:
        profile_data = driver_regs.load_single_user(user_number)
        return JsonResponse(profile_data, safe=False)

def post_profile_handler(request):
    
    data =  request.POST['data']
    data = json.loads(data)
    have_children = data['have_children']
    have_drive_license = data['have_drive_license']
    have_experience_special = data['have_experience_special']
    help_type = data['help_type']
    child_type = data['child_type']
    house_number = data['house_number']
    num_of_children = data['num_of_children']
    rating = data['rating']
    remotely = data['remotely']
    city = data['city']
    street_name = data['street_name']
    school_help = data['school_help']
    smoking = data['smoking']
    user_number = data['user_number']
    description = data['description']
    exp_years = data['exp_years']

    fri_aft = data['fri_aft']
    fri_eve = data['fri_eve']
    fri_mor = data['fri_mor']
    fri_nig = data['fri_nig']

    mon_aft = data['mon_aft']
    mon_eve = data['mon_eve']
    mon_mor = data['mon_mor']
    mon_nig = data['mon_nig']

    sat_aft = data['sat_aft']
    sat_eve = data['sat_eve']
    sat_mor = data['sat_mor']
    sat_nig = data['sat_nig']

    sun_aft = data['sun_aft']
    sun_eve = data['sun_eve']
    sun_mor = data['sun_mor']
    sun_nig = data['sun_nig']

    thu_aft = data['thu_aft']
    thu_eve = data['thu_eve']
    thu_mor = data['thu_mor']
    thu_nig = data['thu_nig']

    tue_aft = data['tue_aft']
    tue_eve = data['tue_eve']
    tue_mor = data['tue_mor']
    tue_nig = data['tue_nig']

    wed_aft = data['wed_aft']
    wed_eve = data['wed_eve']
    wed_mor = data['wed_mor']
    wed_nig = data['wed_nig']

    registration_type = data['registration_type']

    registration = Registration.objects.get(user_number=user_number)
    registration.have_children = have_children
    registration.have_drive_license = have_drive_license
    registration.have_experience_special = have_experience_special
    registration.help_type = help_type
    registration.child_type = child_type
    registration.house_number = house_number
    if registration_type == "parent":
        registration.num_of_children = num_of_children
    else:
        registration.exp_years = exp_years

    registration.rating = rating
    registration.remotely = remotely
    registration.city = city
    registration.street_name = street_name

    registration.school_help = school_help
    registration.smoking = smoking
    registration.description = description
    if request.FILES:
        img_file = request.FILES["img_file"]
        # print( img_file)
        # img_path = 'public/static/profile/profile_' + (str)(user_number) + '.png'
        # print ( img_path)
        # print ( img_file)
        # with open(img_path, "wb+") as f:
        #     for chunk in img_file.chunks():
        #         f.write(chunk)
        registration.avatar = img_file

    registration.save()

    

    print ( 'Updating Profile...')

    # schedule part
    schedule = Schedule.objects.get(user_number=user_number)
    schedule.fri_aft = fri_aft
    schedule.fri_eve = fri_eve
    schedule.fri_mor = fri_mor
    schedule.fri_nig = fri_nig

    schedule.mon_aft = mon_aft
    schedule.mon_eve = mon_eve
    schedule.mon_mor = mon_mor
    schedule.mon_nig = mon_nig

    schedule.sat_aft = sat_aft
    schedule.sat_eve = sat_eve
    schedule.sat_mor = sat_mor
    schedule.sat_nig = sat_nig

    schedule.sun_aft = sun_aft
    schedule.sun_eve = sun_eve
    schedule.sun_mor = sun_mor
    schedule.sun_nig = sun_nig

    schedule.thu_aft = thu_aft
    schedule.thu_eve = thu_eve
    schedule.thu_mor = thu_mor
    schedule.thu_nig = thu_nig

    schedule.tue_aft = tue_aft
    schedule.tue_eve = tue_eve
    schedule.tue_mor = tue_mor
    schedule.tue_nig = tue_nig

    schedule.wed_aft = wed_aft
    schedule.wed_eve = wed_eve
    schedule.wed_mor = wed_mor
    schedule.wed_nig = wed_nig

    schedule.save()
    
    user = User.objects.get(id=user_number)
    
    if registration.avatar:
        userAvatar = registration.avatar.url
    else:
        userAvatar = None
    
    
    user_data = {
        keys.NUMBER_USER: user_number,
        keys.ERROR_CODE: errors.ERROR_NONE,
        keys.FIRST_NAME: user.first_name,
        keys.LAST_NAME: user.last_name,
        keys.USERNAME: user.username,
        keys.REGISTRATION_TYPE: registration.registration_type,
        'userAvatar': userAvatar
    }

    return JsonResponse(user_data)

def request_profile_handler(request):
    try:

        if request.method == 'POST':
            return post_profile_handler(request)

        if request.method == 'GET':
            return get_profile_handler(request)

    except Exception as ex:
        return error_handler(request)
