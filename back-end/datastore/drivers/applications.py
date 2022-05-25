from datastore.models.applications import Application

from shared import errors, keys

def save_application(data):

    babysitter_id = data[keys.NUMBER_USER]
    job_id = data[keys.NUMBER_JOB]
    cover_letter = data[keys.COVER_LETTER]

    application = Application()
    application.babysitter_id = babysitter_id
    application.job_id = job_id
    application.cover_letter = cover_letter
    application.save()

    application_data = {
        keys.ERROR_CODE: errors.ERROR_NONE,
    }

    return application_data
