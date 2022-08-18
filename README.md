# iCare WebApp

## Installation

1. Install Python or Anaconda on your PC.
2. (Terminal A): Go to back-end folder via terminal and do the following commands:

   ``` pip install -r requirements.txt ```

   Please migrate(ensure makemigrations first):

   ``` python manage.py makemigrations ``` 

   ```  python manage.py makemigrations datastore ``` 

   ```  python manage.py migrate ``` 

   ```  python manage.py runserver ``` 

3. (Terminal B): Front-end

   ``` npm install --legacy-peer-deps ``` 
   
   ``` npm start ``` 
   
   
4. Reference Command (Admin Control Platform) for creating django super admin:

   ``` python manage.py createsuperuser ``` 


## Technologies
* OS: Windows
* Python 3.8.5 (Django)
* React
* Boostrap
* SQLite3
* JavaScript
* HTML & CSS
