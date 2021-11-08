from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, DateTimeField, CharField
from animals.models import Animal
from arrivals.models import AnimalArrival
from users.serializers import UserSerializer
from users.models import User
from animals.serializers import AnimalSerializer


class AnimalArrivalsSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = PrimaryKeyRelatedField(
        source='user', queryset=User.objects.all(), required=True, write_only=True)
    animal = AnimalSerializer(read_only=True)
    animal_id = PrimaryKeyRelatedField(
        source='animal', queryset=Animal.objects.all(), required=True, write_only=True)
    date = DateTimeField(read_only=True)
    first_name_of_surrender = CharField(max_length=100, required=False)
    last_name_of_surrender = CharField(max_length=100, required=False)
    address_of_surrender = CharField(max_length=200, required=False)

    class Meta:
        model = AnimalArrival
        fields = ['id', 'user', 'user_id', 'animal_id', 'animal', 'date', 'first_name_of_surrender',
                  'last_name_of_surrender', 'address_of_surrender']
