from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _


# Create your models here.
class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Person(models.Model):
    first_name = models.CharField("Imię", max_length=100, help_text="")
    last_name = models.CharField("Nazwisko", max_length=100, help_text="")
    address = models.CharField("Adres", max_length=200, help_text="")
    pesel = models.CharField("PESEL", max_length=11, unique=True, help_text="")
    email = models.EmailField(unique=True)
    phone = models.CharField("Tel.", max_length=20, help_text="")
    person = models.OneToOneField(User, null=False, on_delete=models.CASCADE)

