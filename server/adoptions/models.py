from django.db import models
from django.utils import timezone
from rest_framework.validators import ValidationError
from animals.models import Animal
from users.models import User


class AnimalAdoption(models.Model):
    user = models.ForeignKey(User, null=False, on_delete=models.PROTECT)
    animal = models.ForeignKey(Animal, null=False, on_delete=models.PROTECT)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.animal) + " " + str(self.date)

    def save(self, *args, **kwargs):
        try:
            return super(AnimalAdoption, self).save(*args, **kwargs)
        except BaseException as e:
            raise ValidationError({ 'error': str(e).split('\n')[0] })
