from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer

# Create your views here.
# get user
class GetUser(APIView):
    # get the user by  uid
    def getUserObject(self, uid):
        try:
            return User.objects.get(id=uid)
        except User.DoesNotExist:
            return None

    # Get user as per the uid
    def get(self, request, uid):
        user = self.getUserObject(uid)

        if not user:
            response_data = {
                "success": False,
                "errors": "User doesn't exist"
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user)

        response_data = {
            "success": True,
            "message": "Fetched Successfully",
            "data": serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)