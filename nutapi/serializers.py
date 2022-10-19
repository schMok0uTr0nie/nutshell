from rest_framework import serializers
from .models import Nut


class NutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nut
        fields = '__all__'
