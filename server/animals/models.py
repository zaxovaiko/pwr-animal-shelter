from django.db import models


# Create your models here.

class AnimalType(models.Model):
    value = models.CharField("Wartość", max_length=100, unique=True, null=False, help_text="")


class AnimalBreed(models.Model):
    value = models.CharField("Wartość", max_length=100, unique=True, null=False, help_text="")


class AnimalGender(models.Model):
    value = models.CharField("Wartość", max_length=100, unique=True, null=False, help_text="")


class AnimalStatus(models.Model):
    value = models.CharField("Wartość", max_length=100, unique=True, null=False, help_text="")


class Animal(models.Model):
    chip_code = models.CharField("Chip Code", max_length=100, unique=True, null=False, help_text="")
    name = models.CharField("Imię", max_length=100, help_text="")
    age = models.IntegerField("Pełnych lat")
    animal_type = models.ForeignKey(AnimalType, on_delete=models.PROTECT)
    animal_breed = models.ForeignKey(AnimalBreed, on_delete=models.PROTECT)
    animal_gender = models.ForeignKey(AnimalGender, on_delete=models.PROTECT)
    color = models.TextField("Kolor", max_length=500, help_text="Opisanie koloru")
    height = models.IntegerField("Wzrost")
    description = models.TextField("Komentarz", max_length=1000, help_text="")
    vaccinations = models.TextField("Szczepienia", max_length=1000, help_text="Tu opisz jakie szczepienia miało")
    animal_status = models.ForeignKey(AnimalStatus, on_delete=models.PROTECT, null=False)

