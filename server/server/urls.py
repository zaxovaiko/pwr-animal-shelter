from django.contrib.auth import admin
from django.urls import include, path
from django.contrib import admin
from rest_framework_extensions.routers import ExtendedSimpleRouter
from animals.views import AnimalViewSet
from users.views import JWTTokenRefreshView, UserViewSet
from locations.views import BuildingViewSet, RoomViewSet


router = ExtendedSimpleRouter(trailing_slash=False)
router.register(r'users', UserViewSet)
router.register(r'animals', AnimalViewSet)
router \
    .register(r'buildings', BuildingViewSet, basename='buildings') \
    .register(r'rooms', RoomViewSet, basename='rooms', parents_query_lookups=['building'])


urlpatterns = [
    path('admin', admin.site.urls),
    path('api', include('rest_framework.urls', namespace='rest_framework')),
    path('api/login', JWTTokenRefreshView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh', JWTTokenRefreshView.as_view(), name='token_refresh'),
    path('api/register', UserViewSet.as_view({ 'post': 'create' })),
    path('api/', include(router.urls))
]
