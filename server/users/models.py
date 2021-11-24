from django.contrib.auth.hashers import make_password
from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from uuid import uuid4
from django.contrib.auth.models import AbstractUser
from rest_framework.exceptions import ValidationError


def image_path(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = "user_%s.%s" % (uuid4().hex, ext)
    return 'users/' + new_filename


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField("Imię", max_length=100)
    last_name = models.CharField("Nazwisko", max_length=100)
    address = models.CharField("Adres", max_length=200)
    pesel = models.CharField("PESEL", max_length=11, unique=True)
    phone = models.CharField("Telefon", max_length=20)
    image = models.ImageField(upload_to=image_path, default='users/default.jpg')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'pesel', 'password']

    def __str__(self):
        return self.email + ' ' + self.pesel

    def save(self, *args, **kwargs):
        try:
            return super(AbstractUser, self).save(*args, **kwargs)
        except BaseException as e:
            raise ValidationError({ 'error': str(e).split('\n')[0] })
