# Web application for animal shelter management

Server side is built with Django REST framework. The client side is built with React.js

## Installation

1. Clone repository
2. Create database with appropriate settings from `server/server/settings.py`
3. Run `cd server && python3 manage.py migrate`
4. Run `cd server && python3 manage.py runserver`
5. Run `cd client && npm install && npm run start`
6. Enjoy the using

To run server with few workers use [gunicorn](https://gunicorn.org/)
