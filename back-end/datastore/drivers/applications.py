from django.contrib.auth.models import User

from datastore.models.applications import Application
from datastore.models.jobs import Job

from shared import errors, keys

from datastore.drivers import chats as driver_chats
from datastore.drivers import jobs as driver_jobs

def single_application(application):

    number_application = application.id
    from_id = application.from_id
    cover_letter = application.cover_letter

    app_master = User.objects.get(id=from_id)
    first_name = app_master.first_name
    last_name = app_master.last_name

    data = {
        keys.NUMBER_APPLICATION: number_application,
        keys.FIRST_NAME: first_name,
        keys.LAST_NAME: last_name,
        keys.COVER_LETTER: cover_letter,
    }

    return data

def save_application(data):

    from_id = data[keys.NUMBER_USER]
    job_id = data[keys.NUMBER_JOB]
    cover_letter = data[keys.COVER_LETTER]

    application = Application()
    application.from_id = from_id
    application.job_id = job_id
    application.cover_letter = cover_letter
    application.save()

    application_data = {
        keys.ERROR_CODE: errors.ERROR_NONE,
    }

    return application_data

def load_posted_jobs(from_id):

    related_jobs = Job.objects.all().filter(
        from_id=from_id,
    )

    data_jobs = []

    job_numbers = [job.id for job in related_jobs]
    for job_number in job_numbers:
        job = Job.objects.get(id=job_number)
        data_job = driver_jobs.single_job(job)
        job_applications = Application.objects.all().filter(job_id=job_number)
        data_applications = []
        for application in job_applications:
            data = single_application(application)
            data_applications.append(data)

        data_job[keys.APPLICATIONS] = data_applications

        data_jobs.append(data_job)

    return data_jobs

def load_applied_jobs(from_id):
    applications = Application.objects.all().filter(
        from_id=from_id,
    )
    data_applications = []

    for application in applications:
        data = single_application(application)

        job_id = application.job_id
        job = driver_jobs.load_single_job(job_id)
        data[keys.JOB] = job

        application_id = application.id
        chat_entry = driver_chats.existing_chat(application_id)
        if chat_entry is not None:
            number_chat = chat_entry.id
            data[keys.NUMBER_CHAT] = number_chat

        data_applications.append(data)
    return data_applications

def load_applications(number_user):
    data = {
        keys.POSTED_JOBS:load_posted_jobs(number_user),
        keys.APPLIED_JOBS:load_applied_jobs(number_user)}
    print ( 'final_final', data)
    return data