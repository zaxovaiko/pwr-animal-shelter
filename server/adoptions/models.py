from django.db import models

# Create your models here.
from django.utils import timezone

from animals.models import Animal
from users.models import Person


class AnimalAdoption(models.Model):
    person = models.ForeignKey(Person, on_delete=models.PROTECT)
    animal = models.ForeignKey(Animal, on_delete=models.PROTECT)
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return str(self.animal) + " " + str(self.date)
