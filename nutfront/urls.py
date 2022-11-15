from django.urls import path
from . import views

urlpatterns = [
    path('', views.nutlist, name="nut_list"),
]
