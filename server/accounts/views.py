from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class Signup(APIView):

    def post(self, request):
        serializer=RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user=serializer.save()

            response_data={
                "success":True,
                "message":"Account created successfully",
                "data":{
                    "user":UserSerializer(user).data,
                    "token":AuthToken.objects.create(user)[1]
                }
            }
            return Response(response_data,status=status.HTTP_201_CREATED)
        response_data={
            "success":False,
            "errors":serializer.errors
        }
        return Response(response_data,status=status.HTTP_400_BAD_REQUEST)

class Login(APIView):

    def post(self, request):
        serializer=LoginSerializer(data=request.data)

        if serializer.is_valid():
            user=serializer.validated_data

            response_data={
                "success":True,
                "message":"logged in successfully",
                "data":{
                    "user":UserSerializer(user).data,
                    "token":AuthToken.objects.create(user)[1]
                }
            }
            return Response(response_data,status=status.HTTP_200_OK)

        response_data={
            "success":False,
            "errors":serializer.errors
        }
        return Response(response_data,status=status.HTTP_400_BAD_REQUEST)

class CurrentUser(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
 
        response_data={
            "success":True,
            "message":"fetched user",
            "data":{
                "user":{
                    "id":request.user.id,
                    "username":request.user.username,
                    "email":request.user.email
                },
            }
        }
        return Response(response_data,status=status.HTTP_200_OK)




    

