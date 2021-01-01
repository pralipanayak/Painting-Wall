from rest_framework import serializers
from . models import Paintings

class PaintingsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Paintings
        fields='__all__'