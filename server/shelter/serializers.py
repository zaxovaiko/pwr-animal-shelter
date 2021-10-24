from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User


class TokenObtainPairSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        token = super(TokenObtainPairSerializer, cls).get_token(user)
        token['email'] = user.email
        return token


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('password', 'email')
        extra_kwargs = {}

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['email']
