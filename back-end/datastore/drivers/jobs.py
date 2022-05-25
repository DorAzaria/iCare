from django.contrib.auth.models import User

import time

from datastore.drivers import registrations as driver_registration

from datastore.models.jobs import Job
from datastore.models.registrations import Registration
from datastore.models.sessions import Session

from shared import errors, keys

def single_job(job):

    number_job = job.id
    title = job.title
    description = job.description
    time_a = job.time_a
    time_b = job.time_b

    data = {
        keys.NUMBER_JOB: number_job,
        keys.TITLE: title,
        keys.DESCRIPTION: description,
        keys.TIME_A: time_a,
        keys.TIME_B: time_b,
    }

    return data

def jobs_array(jobs):

    array = []
    for job in list(jobs):

        data = single_job(job)
        array.append(data)

    return array

def load_single_job(job_number):

    job = Job.objects.get(id=job_number)
    return single_job(job)

def load_all_jobs():

    all_jobs = Job.objects.all().filter(enabled=True)
    all_data = jobs_array(all_jobs)
    return all_data

def load_parent_jobs(parent_number):

    parent_jobs = Job.objects.all().filter(parent_id=parent_number)
    parent_data = jobs_array(parent_jobs)
    return parent_data

def load_jobs(parent_number=None):

    if parent_number is not None:
        return load_parent_jobs(parent_number)

    return load_all_jobs()

def save_job(data):

    session_key = data[keys.SESSION]

    session = Session.objects.get(key=session_key)
    user = User.objects.get(username=session.user)
    registration = Registration.objects.get(user_number=user.id)

    registration_type = registration.registration_type

    # only parents can write job posts
    if registration_type == driver_registration.TYPES['parent']:
        title = data[keys.TITLE]
        description = data[keys.DESCRIPTION]
        time_a = data[keys.TIME_A]
        time_b = data[keys.TIME_B]
        parent_id = user.id
        post_time = int(time.time() * 1000)

        job = Job()
        job.title = title
        job.description = description
        job.time_a = time_a
        job.time_b = time_b
        job.parent_id = parent_id
        job.enabled = True
        job.post_time = post_time
        job.save()

        job_data = {
            keys.NUMBER_JOB: job.id,
            keys.ERROR_CODE: errors.ERROR_NONE,
        }

        return job_data
