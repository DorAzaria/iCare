from django.contrib.auth.models import User

from datastore.models.registrations import Registration

from shared import keys

TYPES = {
    'babysitter': 1,
    'parent': 2,
}

LABELS = {
    1: 'babysitter',
    2: 'parent',
}

def create_registration(data):

    username = data[keys.USERNAME]
    email = data[keys.EMAIL]
    password = data[keys.PASSWORD]
    first_name = data[keys.FIRST_NAME]
    last_name = data[keys.LAST_NAME]
    registration_type = data[keys.REGISTRATION_TYPE]

    new_user = User.objects.create_user(
        username,
        email,
        password,
    )

    new_user.first_name = first_name
    new_user.last_name = last_name
    new_user.save()

    user_number = new_user.id
    registration_type = TYPES[registration_type]

    registration = Registration()
    registration.user_number = user_number
    registration.registration_type = registration_type
    registration.save()

def find_registration(user_number):
    return Registration.objects.get(user_number=user_number)
