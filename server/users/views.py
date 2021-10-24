from .models import User
from rest_framework import viewsets, generics, permissions
from .serializers import UserSerializer
from .serializers import RegisterSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ()
    serializer_class = RegisterSerializer