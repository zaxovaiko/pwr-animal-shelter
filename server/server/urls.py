"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib.auth import admin
from django.urls import include, path
from django.contrib import admin
from users.views import JWTTokenRefreshView
from users.views import UserViewSet


urlpatterns = [
    path('api', include('rest_framework.urls', namespace='rest_framework')),
    path('api/login', JWTTokenRefreshView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh', JWTTokenRefreshView.as_view(), name='token_refresh'),
    path('api/register', UserViewSet.as_view({ 'post': 'create' })),
    path('api/users', include('users.urls')),
    path('admin', admin.site.urls)
]
