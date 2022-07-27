import email
from datastore.models.users import User

from datetime import datetime

from datastore.models.jobs import Job
from datastore.models.registrations import Registration
from datastore.models.schedules import Schedule
from datastore.models.sessions import Session
from datastore.models.votes import Vote
from shared import errors, keys
from datastore.models.applications import Application
from datastore.models.chats import Chat, Message


def single_job(job):

    number_job = job.id
    title = job.title
    description = job.description
    time_a = job.time_a
    time_b = job.time_b

    from_id = job.from_id
    job_user = Registration.objects.get(user_number=from_id)
    job_user_type = job_user.registration_type
    job_user_loc = job_user.loc
    if job_user.avatar:
        userAvatar = job_user.avatar.url
    else:
        userAvatar = None
    allVotes = Vote.objects.filter(job_id = number_job).count()

    data = {
        keys.NUMBER_JOB: number_job,
        keys.TITLE: title,
        keys.DESCRIPTION: description,
        keys.TIME_A: time_a,
        keys.TIME_B: time_b,
        keys.REGISTRATION_TYPE: job_user_type,
        keys.NUMBER_USER: job_user.user_number,
        keys.USERNAME: job_user.username,
        keys.AGE:job_user.age,
        keys.LOCATION:job_user_loc,
        'userAvatar': userAvatar,
        'price': job_user.rating,
        'city': job_user.city,
        'allVotes': allVotes
    }

    return data

def single_application(application):

    number_application = application.id
    from_id = application.from_id
    cover_letter = application.cover_letter

    app_master = Registration.objects.get(user_number=from_id)
    user_name = app_master.username
    location = app_master.loc
    city = app_master.city
    if app_master.avatar:
        userAvatar = app_master.avatar.url
    else:
        userAvatar = None

    data = {
        keys.NUMBER_APPLICATION: number_application,
        keys.NUMBER_FROM: from_id,
        keys.USERNAME: user_name,
        keys.COVER_LETTER: cover_letter,
        keys.LOCATION: location,
        'userAvatar': userAvatar,
        'city': city
    }

    return data

def existing_chat(application_id):

    chat_entry = None

    try:

        chat_entry = Chat.objects.get(application_id=application_id)

    except Chat.DoesNotExist:
        pass

    return chat_entry

def load_single_job(job_number, user_number):

    job = Job.objects.get(id=job_number)
    data = single_job(job)
    job_applications = Application.objects.filter(job_id=int(job.id), from_id=user_number)
    if job_applications.exists():
        data['applied'] = True
        data['application_number'] = job_applications[0].id
    else:
        data['applied'] = False
        data['application_number'] = None
    if Vote.objects.filter(job_id=int(job.id), from_id=user_number).exists():
        data['heart'] = True
    else:
        data['heart'] = False
    return data

def jobs_array(jobs):
    array = []
    for job in list(jobs):
        
        data = single_job(job)
        job_applications = Application.objects.filter(job_id=int(job.id))
        data_applications = []
        for application in job_applications:
            tempArr = {}
            number_application = application.id
            from_id = application.from_id
            chat_entry = existing_chat(number_application)
            if chat_entry is not None:
                number_chat = chat_entry.id
                tempArr[keys.NUMBER_CHAT] = number_chat
            tempArr[keys.NUMBER_APPLICATION] = number_application
            tempArr[keys.NUMBER_FROM] = from_id
            data_applications.append(tempArr)

        data[keys.APPLICATIONS] = data_applications
        array.append(data)
    
    return array


def load_all_jobs():

    all_jobs = Job.objects.filter(enabled=True)
    all_data = jobs_array(all_jobs)
    return all_data

def load_user_jobs(from_number):

    user_jobs = Job.objects.all().filter(from_id=from_number)
    user_data = jobs_array(user_jobs)
    return user_data

def load_filter_jobs(user_number):
    all_jobs = Job.objects.filter(enabled=True)
    array = []
    for job in list(all_jobs):
        
        data = single_job(job)
        job_applications = Application.objects.filter(job_id=int(job.id), from_id=user_number)
        if job_applications.exists():
            data['applied'] = True
            data['application_number'] = job_applications[0].id
        else:
            data['applied'] = False
            data['application_number'] = None
        if Vote.objects.filter(job_id=int(job.id), from_id=user_number).exists():
            data['heart'] = True
        else:
            data['heart'] = False
        
        array.append(data)
    return array

def load_jobs(from_number=None):

    if from_number is not None:
        return load_user_jobs(from_number)

    return load_all_jobs()

def save_job(data):

    session_key = data[keys.SESSION]
    
    session = Session.objects.get(key=session_key)
    user = User.objects.get(email=session.user)
    registration = Registration.objects.get(user_number=user.id)
    registration_type = registration.registration_type

    title = data[keys.TITLE]
    description = data[keys.DESCRIPTION]
    time_a = data[keys.TIME_A]
    print ( time_a)
    time_b = data[keys.TIME_B]
    from_id = user.id
    post_time = datetime.now().strftime("%Y-%m-%d %H-%M")
    print ( post_time)

    job = Job()
    job.title = title
    job.description = description
    job.time_a = time_a
    job.time_b = time_b
    job.from_id = from_id
    job.user_type = registration_type
    job.enabled = True
    job.post_time = post_time
    job.save()
    print ( 'Saving job...')

    job_data = {
        keys.NUMBER_JOB: job.id,
        keys.ERROR_CODE: errors.ERROR_NONE,
    }
    print ( job_data)
    return job_data

def filter_jobs(location, price, schedule, user_number):
    print(location, price, schedule,user_number, "ddfdfd")
    # current logined user data get
    currentUser = Registration.objects.get(user_number=user_number)
    city = currentUser.city
    rating = currentUser.rating
    ids = []
    if location == 'true' and price == 'true' and schedule == 'true':
        # scheduleData = Schedule.objects.filter().exclude(user_number=user_number)
        registered = Registration.objects.filter(city=city, rating__lte=rating, registration_type=1).exclude(user_number=user_number)
        ids = registered.values_list('pk', flat=True)
        job_data = Job.objects.filter(from_id__in=list(ids))
    elif location == 'true' and price == 'true' and schedule == 'false':
        registered = Registration.objects.filter(city=city, rating__lte=rating, registration_type=1).exclude(user_number=user_number)
        ids = registered.values_list('pk', flat=True)
        job_data = Job.objects.filter(from_id__in=list(ids))
    elif location == 'true' and price == 'false' and schedule == 'false':
        registered = Registration.objects.filter(city=city, registration_type=1).exclude(user_number=user_number)
        ids = registered.values_list('pk', flat=True)
        job_data = Job.objects.filter(from_id__in=list(ids))

    elif location == 'false' and price == 'true' and schedule == 'false':
        registered = Registration.objects.filter(rating__lte=rating, registration_type=1).exclude(user_number=user_number)
        ids = registered.values_list('pk', flat=True)
        job_data = Job.objects.filter(from_id__in=list(ids))
    
    else:
        job_data = Job.objects.all()

    job_data = jobs_array(job_data)
        
    return job_data 
