import os
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.permissions import IsAdminUser, BasePermission
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
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
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    ordering_fields = ['first_name', 'email', 'last_name', 'pesel', 'id']
    filterset_fields = ['first_name', 'last_name', 'email', 'pesel', 'id', 'is_staff', 'is_superuser']

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


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}?token={}".format(
            'http://localhost:3000/password-reset/confirm',
            reset_password_token.key)
    }

    # render email text
    email_html_message = render_to_string('email/user_reset_password.html', context)
    email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

    print(reset_password_token.user.email)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Wrocławskie schronisko dla zwierząt"),
        # message:
        email_plaintext_message,
        # from:
        "zaxovaiko@gmail.com",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()