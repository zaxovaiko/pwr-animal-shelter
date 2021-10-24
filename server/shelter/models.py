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