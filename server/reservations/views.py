import django_filters.rest_framework
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from .serializers import AnimalReservationsSerializer, ReservationStatusSerializer
from .models import AnimalReservation, ReservationStatus


class AnimalReservationsViewSet(viewsets.ModelViewSet):
    queryset = AnimalReservation.objects.all()
    serializer_class = AnimalReservationsSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['user', 'date']

    def list(self, request, *args, **kwargs):
        user_id = request.user.id
        queryset = AnimalReservation.objects.filter(user=user_id)
        serializer = AnimalReservationsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_permissions(self):
        if self.action == 'list':
            return [IsAuthenticated()]
        if self.action == 'retrieve':
            return [AllowAny()]
        return [IsAdminUser()]


class ReservationStatusViewSet(viewsets.ModelViewSet):
    queryset = ReservationStatus.objects.all()
    serializer_class = ReservationStatusSerializer

    def get_permissions(self):
        return [AllowAny()] if self.action == 'retrieve' or self.action == 'list' else [IsAdminUser()]
