from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField("Imię", max_length=100)
    last_name = models.CharField("Nazwisko", max_length=100)
    address = models.CharField("Adres", max_length=200)
    pesel = models.CharField("PESEL", max_length=11, unique=True)
    phone = models.CharField("Telefon", max_length=20)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'pesel', 'password']

    def __str__(self):
        return self.email + ' ' + self.pesel
        
