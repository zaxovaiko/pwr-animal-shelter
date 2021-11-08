from django.core.exceptions import ValidationError
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer
from adoptions.models import AnimalAdoption
from animals.models import Animal, AnimalStatus
from users.serializers import UserSerializer
from users.models import User
from animals.serializers import AnimalSerializer


class AnimalAdotpionsSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = PrimaryKeyRelatedField(source='user', queryset=User.objects.all(), required=True, write_only=True)
    animal = AnimalSerializer(read_only=True)
    animal_id = PrimaryKeyRelatedField(source='animal', queryset=Animal.objects.all(), required=True, write_only=True)

    class Meta:
        model = AnimalAdoption
        fields = ['user_id', 'animal_id', 'user', 'animal', 'date']

    def create(self, validated_data):
        validated_data['animal'].animal_status = AnimalStatus.objects.get(pk=3)
        validated_data['animal'].save()
        animal_adoption = super().create(validated_data)
        return animal_adoption

    def validate(self, attrs):
        if str(attrs['animal'].animal_status) != 'Do adopcji':
            raise ValidationError('You can not adopt animal which is not ready for adoption')
        return attrs
