| <img src="https://github.com/DorAzaria/iCare/blob/main/front-end/public/logo.png?raw=true" width="300px" hight="300px" /> | iCare is web-application that helps parents and families find the right babysitter or nanny, and also helps the babysitters and nannies find a job or part-time job.| 
| -- | -- |


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
* NodeJS
* React
* Boostrap
* SQLite3
* JavaScript
* HTML & CSS
