from django.http.response import HttpResponse
import django_filters.rest_framework
from rest_framework import filters, status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from server.utils import render_to_pdf
from .serializers import AnimalReservationsSerializer, ReservationStatusSerializer
from .models import AnimalReservation, ReservationStatus
from animals.models import Animal
from users.models import User


class AnimalReservationsViewSet(viewsets.ModelViewSet):
    queryset = AnimalReservation.objects.all()
    serializer_class = AnimalReservationsSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['user', 'date']
    ordering_fields = ['date']

    def get_users(self, request, *args, **kwargs):
        user_id = request.user.id
        queryset = AnimalReservation.objects.filter(user=user_id)
        serializer = AnimalReservationsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_permissions(self):
        if self.action == 'generate_doc':
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def generate_doc(self, request, *args, **kwargs):
        data = request.data
        user_id = data.get('user_id', None)
        animal_id = data.get('animal_id', None)

        if not user_id or not animal_id:
            raise ValidationError({'error': 'Invalid arguments'})

        animal = Animal.objects.get(id=animal_id)
        user = User.objects.get(id=user_id)

        if not animal or not user:
            raise ValidationError({'error': 'User or animal does not exist'})

        pdf = render_to_pdf('documents/reservation.html', { 'user': user, 'animal': animal })
        return HttpResponse(pdf, content_type='application/pdf')


class ReservationStatusViewSet(viewsets.ModelViewSet):
    queryset = ReservationStatus.objects.all()
    serializer_class = ReservationStatusSerializer

    def get_permissions(self):
        return [AllowAny()] if self.action == 'retrieve' or self.action == 'list' else [IsAdminUser()]
