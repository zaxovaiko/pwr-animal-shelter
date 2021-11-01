from datetime import timedelta
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User


class JWTTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token.access_token.set_exp(lifetime=timedelta(days=10))

        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

        return token


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[
                                   UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(max_length=100, required=True)
    last_name = serializers.CharField(max_length=100, required=True)
    pesel = serializers.CharField(max_length=11, required=True)
    address = serializers.CharField(max_length=200, required=False)
    phone = serializers.CharField(max_length=20, required=False)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'address',
                  'pesel', 'phone', 'email', 'id')

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user
