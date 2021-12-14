import os
from django.db import models
from django.dispatch import receiver
from uuid import uuid4
from rest_framework.exceptions import ValidationError


def image_path(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = "animal_%s.%s" % (uuid4().hex, ext)
    return 'animals/' + new_filename


class AnimalType(models.Model):
    value = models.CharField("Wartość", max_length=100,
                             unique=True, null=False)

    def __str__(self):
        return str(self.value)

    class Meta:
        verbose_name = 'Gatunek Zwierzęcia'
        verbose_name_plural = 'Gatunki Zwierząt'


class AnimalBreed(models.Model):
    value = models.CharField("Wartość", max_length=100,
                             unique=True, null=False)

    def __str__(self):
        return str(self.value)

    class Meta:
        verbose_name = 'Rasa Zwierzęcia'
        verbose_name_plural = 'Rasy Zwierząt'


class AnimalGender(models.Model):
    value = models.CharField("Wartość", max_length=20,
                             unique=True, null=False)

    def __str__(self):
        return str(self.value)

    class Meta:
        verbose_name = 'Płeć Zwierzęcia'
        verbose_name_plural = 'Płeć Zwierząt'


class AnimalStatus(models.Model):
    value = models.CharField("Wartość", max_length=100,
                             unique=True, null=False)

    def __str__(self):
        return str(self.value)

    class Meta:
        verbose_name = 'Status Zwierzęcia'
        verbose_name_plural = 'Statusy Zwierząt'


class Animal(models.Model):
    chip_code = models.CharField(
        "Chip Code", max_length=50, unique=True, null=False)
    name = models.CharField("Imię", max_length=50)
    age = models.PositiveSmallIntegerField("Pełnych lat")
    animal_type = models.ForeignKey(AnimalType,  on_delete=models.PROTECT, verbose_name="Gatunek Zwierzęcia")
    animal_breed = models.ForeignKey(AnimalBreed, on_delete=models.PROTECT, verbose_name="Rasa Zwierzęcia")
    animal_gender = models.ForeignKey(AnimalGender, on_delete=models.PROTECT, verbose_name="Płeć Zwierzęcia")
    color = models.TextField("Kolor", max_length=500,
                             help_text="Opisanie koloru")
    image = models.ImageField(upload_to=image_path, default='animals/default.jpg', verbose_name="Zdjęcie")
    height = models.PositiveSmallIntegerField("Wzrost")
    weight = models.PositiveSmallIntegerField("Masa")
    description = models.TextField("Komentarz", max_length=1000, null=True)
    vaccinations = models.TextField(
        "Szczepienia", max_length=1000, help_text="Tu opisz jakie szczepienia miało")
    animal_status = models.ForeignKey(
        AnimalStatus, on_delete=models.PROTECT, null=False, verbose_name="Status Zwierzęcia")

    def __str__(self):
        return str(self.name) + " " + str(self.chip_code)

    class Meta:
        verbose_name = 'Zwierzę'
        verbose_name_plural = 'Zwierzęta'

    def save(self, *args, **kwargs):
        try:
            return super(Animal, self).save(*args, **kwargs)
        except BaseException as e:
            raise ValidationError({ 'error': str(e).split('\n')[0] })


class AnimalImage(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, null=False, related_name="images")
    image = models.ImageField(upload_to=image_path, null=False)


def _delete_file(path):
   if os.path.isfile(path):
       os.remove(path)


@receiver(models.signals.post_delete, sender=AnimalImage)
def delete_file(sender, instance, *args, **kwargs):
    if instance.image:
        _delete_file(instance.image.path)


@receiver(models.signals.post_delete, sender=Animal)
def delete_file(sender, instance, *args, **kwargs):
    if instance.image:
        _delete_file(instance.image.path)
    if instance.images:
        for image in instance.images.all(): 
            _delete_file(image.path)
