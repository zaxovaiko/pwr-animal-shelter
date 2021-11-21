from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User


class JWTTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['id'] = user.id
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser
        return token


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[
                                   UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(max_length=100, required=True)
    last_name = serializers.CharField(max_length=100, required=True)
    pesel = serializers.CharField(min_length=11, max_length=11, required=True, validators=[
        UniqueValidator(queryset=User.objects.all())])
    address = serializers.CharField(max_length=200, required=False)
    image = serializers.ImageField(
        max_length=1000, required=False, allow_empty_file=False)
    phone = serializers.CharField(max_length=20, required=False)

    class Meta:
        model = User
        extra_kwargs = {'password': {'write_only': True}}
        fields = ('first_name', 'last_name', 'address',
                  'pesel', 'phone', 'email', 'id', 'is_staff', 'password', 'image', 'is_superuser')

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()
        return instance
