import os
from rest_framework import viewsets
from rest_framework.permissions import OR, IsAdminUser, BasePermission
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import JWTTokenObtainPairSerializer, UserSerializer
from .models import User


class IsAuthenticatedAndIsOwnerOrIsAdmin(BasePermission):
    message = 'You can not change the others user info'

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj and (obj.id == request.user.id or request.user.is_staff)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    action_permissions = {
        'delete': [IsAdminUser],
        'update': [IsAuthenticatedAndIsOwnerOrIsAdmin],
        'partial_update': [IsAuthenticatedAndIsOwnerOrIsAdmin],
    }

    def update(self, request, *args, **kwargs):
        if 'image' in request.data:
            user = self.get_object()
            if os.path.isfile(user.image.path):
                os.unlink(user.image.path)
        return super().update(request, *args, **kwargs)

    def get_permissions(self):
        return [ i() for i in self.action_permissions.get(self.action, []) ]


class JWTTokenRefreshView(TokenObtainPairView):
    serializer_class = JWTTokenObtainPairSerializer
