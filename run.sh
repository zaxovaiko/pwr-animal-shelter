#!/bin/bash

if ! python3 --version ; 
then
    cd server && 
    python manage.py runserver &
else
    cd server && 
    python3 manage.py runserver &
fi

cd client && 
npm install && 
npm run start