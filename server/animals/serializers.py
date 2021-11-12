from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, CharField, PrimaryKeyRelatedField, IntegerField, ImageField
from animals.models import *


class AnimalBreedSerializer(ModelSerializer):
    value = serializers.CharField(max_length=100, required=True)

    class Meta:
        model = AnimalBreed
        fields = ['id', 'value']


class AnimalStatusSerializer(ModelSerializer):
    value = serializers.CharField(max_length=100, required=True)

    class Meta:
        model = AnimalStatus
        fields = ['id', 'value']


class AnimalTypeSerializer(ModelSerializer):
    value = serializers.CharField(max_length=100, required=True)

    class Meta:
        model = AnimalType
        fields = ['id', 'value']


class AnimalGenderSerializer(ModelSerializer):
    value = serializers.CharField(max_length=100, required=True)

    class Meta:
        model = AnimalGender
        fields = ['id', 'value']


class AnimalSerializer(ModelSerializer):
    chip_code = CharField(max_length=100, required=True)
    name = CharField(max_length=100, required=True)
    age = IntegerField(min_value=0, required=True)
    animal_type = AnimalTypeSerializer(read_only=True)
    animal_type_id = PrimaryKeyRelatedField(
        source='animal_type', queryset=AnimalType.objects.all(), required=True, write_only=True)
    animal_breed = AnimalBreedSerializer(read_only=True)
    animal_breed_id = PrimaryKeyRelatedField(
        source='animal_breed', queryset=AnimalBreed.objects.all(), required=True, write_only=True)
    animal_gender = AnimalGenderSerializer(read_only=True)
    animal_gender_id = PrimaryKeyRelatedField(
        source='animal_gender', queryset=AnimalGender.objects.all(), required=True, write_only=True)
    color = CharField(max_length=500, required=True)
    height = IntegerField(min_value=0, required=True)
    weight = IntegerField(min_value=0, required=True)
    description = CharField(max_length=1000, required=True)
    vaccinations = CharField(max_length=1000, required=True)
    image = ImageField(max_length=1000, required=True, allow_empty_file=False)
    animal_status = AnimalStatusSerializer(read_only=True)
    animal_status_id = PrimaryKeyRelatedField(
        source='animal_status', queryset=AnimalStatus.objects.all(), required=True, write_only=True)

    class Meta:
        model = Animal
        fields = ['id', 'weight', 'chip_code', 'name', 'age', 'animal_type_id', 'animal_breed_id', 'animal_gender_id', 'animal_status_id',
                  'animal_type', 'animal_breed', 'animal_gender', 'color', 'height', 'description', 'vaccinations', 'animal_status', 'image']
