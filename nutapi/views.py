from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Nut
from .serializers import NutSerializer


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/hollow/',
        'Detail View': '/nut/<str:pk>/',
        'Create': '/nut/create/',
        'Update': '/nut/update/<str:pk>/',
        'Delete': '/nut/delete/<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def nutList(request):
    nuts = Nut.objects.all().order_by('-id')
    serializer = NutSerializer(nuts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def nutDetail(request, pk):
    nut = Nut.objects.get(id=pk)
    serializer = NutSerializer(nut, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def nutCreate(request):
    serializer = NutSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def nutUpdate(request, pk):
    nut = Nut.objects.get(id=pk)
    serializer = NutSerializer(instance=nut, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def nutDelete(request, pk):
    nut = Nut.objects.get(id=pk)
    nut.delete()
    return Response("Item successfully deleted!'")
