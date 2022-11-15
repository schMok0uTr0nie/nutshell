from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('nutapi.urls')),
    path('', include('nutfront.urls')),
]
