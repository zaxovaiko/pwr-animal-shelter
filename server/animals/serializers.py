from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator
from rest_framework.serializers import ModelSerializer, CharField, PrimaryKeyRelatedField, IntegerField, ImageField
from animals.models import *


class AnimalBreedSerializer(ModelSerializer):
    value = CharField(max_length=100, required=True, validators=[
        UniqueValidator(queryset=AnimalBreed.objects.all())])

    class Meta:
        model = AnimalBreed
        fields = ['id', 'value']


class AnimalStatusSerializer(ModelSerializer):
    value = CharField(max_length=100, required=True, validators=[
        UniqueValidator(queryset=AnimalStatus.objects.all())])

    class Meta:
        model = AnimalStatus
        fields = ['id', 'value']


class AnimalTypeSerializer(ModelSerializer):
    value = CharField(max_length=100, required=True, validators=[
        UniqueValidator(queryset=AnimalType.objects.all())])

    class Meta:
        model = AnimalType
        fields = ['id', 'value']


class AnimalGenderSerializer(ModelSerializer):
    value = CharField(max_length=100, required=True,  validators=[
        UniqueValidator(queryset=AnimalGender.objects.all())])

    class Meta:
        model = AnimalGender
        fields = ['id', 'value']


class AnimalImageSerializer(ModelSerializer):
    animal = PrimaryKeyRelatedField(
        queryset=Animal.objects.all(), required=True, write_only=True)
    image = ImageField(
        max_length=1000, required=True, allow_empty_file=False)

    class Meta:
        model = AnimalImage
        fields = ['id', 'image', 'animal']
        depth = 1


class AnimalSerializer(ModelSerializer):
    chip_code = CharField(max_length=100, required=True, validators=[
        UniqueValidator(queryset=Animal.objects.all())])
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
    image = ImageField(max_length=1000, required=False, allow_empty_file=False)
    images = AnimalImageSerializer(many=True, read_only=True)
    animal_status = AnimalStatusSerializer(read_only=True)
    animal_status_id = PrimaryKeyRelatedField(
        source='animal_status', queryset=AnimalStatus.objects.all(), required=True, write_only=True)

    class Meta:
        model = Animal
        fields = ['id', 'weight', 'images', 'chip_code', 'name', 'age', 'animal_type_id', 'animal_breed_id', 'animal_gender_id', 'animal_status_id',
                  'animal_type', 'animal_breed', 'animal_gender', 'color', 'height', 'description', 'vaccinations', 'animal_status', 'image']

    def validate(self, attrs):
        if 'request' in self.context:
            request = self.context['request']

            if len(request.FILES.getlist('images')) > 6:
                return ValidationError('Maximum number of attached images is 6')

        return super().validate(attrs)
