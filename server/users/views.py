from rest_framework import viewsets, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import JWTTokenObtainPairSerializer, UserSerializer
from .models import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    action_permissions = {
        'delete': [permissions.IsAuthenticated],
        'update': [permissions.IsAuthenticated],
        'partial_update': [permissions.IsAuthenticated],
    }


    def get_permissions(self): 
        return self.action_permissions.get(self.action, [])


class JWTTokenRefreshView(TokenObtainPairView):
    serializer_class = JWTTokenObtainPairSerializer