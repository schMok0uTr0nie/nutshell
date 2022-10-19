from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api_overview"),
    path('hollow/', views.nutList, name="hollow"),
    path('nut/<str:pk>', views.nutDetail, name="nut_detail"),
    path('nut/create/', views.nutCreate, name="nut_create"),
    path('nut/update/<str:pk>', views.nutUpdate, name="nut_update"),
    path('nut/delete/<str:pk>', views.nutDelete, name="nut_delete"),
]
