from django.contrib.auth import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from django.contrib import admin
from rest_framework_extensions.routers import ExtendedSimpleRouter
from animals.views import AnimalViewSet
from adoptions.views import AnimalAdoptionViewSet
from reservations.views import AnimalReservationsViewSet
from arrivals.views import AnimalArrivalsViewSet
from animals.views import AnimalBreedViewSet, AnimalGenderViewSet, AnimalStatusViewSet, AnimalTypeViewSet
from reservations.views import ReservationStatusViewSet
from users.views import JWTTokenRefreshView, UserViewSet
from locations.views import BuildingViewSet, RoomViewSet, AnimalLocationViewSet


router = ExtendedSimpleRouter(trailing_slash=False)
router.register(r'users', UserViewSet)
router.register(r'animals', AnimalViewSet)
router.register(r'animal-breeds', AnimalBreedViewSet)
router.register(r'animal-types', AnimalTypeViewSet)
router.register(r'animal-statuses', AnimalStatusViewSet)
router.register(r'animal-genders', AnimalGenderViewSet)
router.register(r'reservation-statuses', ReservationStatusViewSet)
router.register(r'animals-locations', AnimalLocationViewSet)
router.register(r'animals-adoptions', AnimalAdoptionViewSet)
router.register(r'animals-reservations', AnimalReservationsViewSet)
router.register(r'animals-arrivals', AnimalArrivalsViewSet)
router \
    .register(r'buildings', BuildingViewSet, basename='buildings') \
    .register(r'rooms', RoomViewSet, basename='rooms', parents_query_lookups=['building'])


urlpatterns = [
    path('admin', admin.site.urls),
    path('api', include('rest_framework.urls', namespace='rest_framework')),
    path('api/login', JWTTokenRefreshView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh', JWTTokenRefreshView.as_view(), name='token_refresh'),
    path('api/password_reset', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('api/register', UserViewSet.as_view({'post': 'create'})),
    path('api/animals-reservations/users', AnimalReservationsViewSet.as_view({'get': 'get_users'})),
    path('api/animals-reservations/generate_document', AnimalReservationsViewSet.as_view({'post': 'generate_doc'})),
    path('api/adopted', AnimalAdoptionViewSet.as_view({'get': 'adopted'})),
    path('api/', include(router.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
