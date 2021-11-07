from rest_framework.serializers import ModelSerializer, IntegerField
from adoptions.models import AnimalAdoption
from users.serializers import UserSerializer
from animals.serializers import AnimalSerializer


class AnimalAdotpionsSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = IntegerField(required=True, write_only=True)
    animal = AnimalSerializer(read_only=True)
    animal_id = IntegerField(required=True, write_only=True)

    class Meta:
        model = AnimalAdoption
        fields = '__all__'
