from django.shortcuts import render
# from django.http import HttpResponse
# from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . models import Paintings
from . serializers import PaintingsSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .permissions import IsReadOnly
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings
from .permissions import IsReadOnly, IsReadOnlyAndRequest  # custom permission class
# Create your views here.
class AllPaintings(APIView):
    permission_classes=[IsReadOnly]
    def getUserObject(self,uid):
        try:
            return User.objects.get(id=uid)
        except User.DoesNotExist:
            return None

    def get(self, request):
        #get all paintings as per user id
        #QUERY:user
        if request.GET.get('user'):
            uid=request.GET.get('user')
            user=self.getUserObject(uid)

            if not user:
                response_data={
                    "success":False,
                    "errors":"User does not exists"
                }
                return Response(response_data, status=status.HTTP_404_NOT_FOUND)

            paintings= Paintings.objects.filter(owner=user)

        else:
            #get all paintings
            paintings=Paintings.objects.all()

        serializer=PaintingsSerializer(paintings,many=True)
        response_data={
            "success":True,
            "messages":"successfully fetched",
            "data":{
                "total":len(serializer.data),
                "paintings":serializer.data
            }
        }
        return Response(response_data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer=PaintingsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(owner = request.user)

            response_data={
                "success":True,
                "message":"Added successfully",
                "data":serializer.data
            }
            return Response(response_data,status=status.HTTP_201_CREATED)
        response_data={
            "success":False,
            "errors":serializer.errors
        }
        return Response(response_data,status=status.HTTP_400_BAD_REQUEST)

class Painting(APIView):
    permission_classes=[IsReadOnlyAndRequest]
    #custom method -- grt thr painting by painting id or individual paintings
    def getPaintingObject(self, painting_id):
        try:
            return Paintings.objects.get(id=painting_id)
        except Paintings.DoesNotExist:
            return None

    def get(self, request, painting_id):
        #get painting by id
        #PARAM:painting id
        painting=self.getPaintingObject(painting_id)

        if not painting:
            response_data={
                "success":False,
                "errors":"Painting does not exists"
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        serializer=PaintingsSerializer(painting)
        response_data={
            "success":True,
            "messages":"successfully fetched",
            "data":serializer.data
                
        }
        return Response(response_data, status=status.HTTP_200_OK)

    #updating painting
    def put(self, request, painting_id):

        painting=self.getPaintingObject(painting_id)

        if not painting:
            response_data={
                "success":False,
                "errors":"Painting does not exists"
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        serializer=PaintingsSerializer(painting, data=request.data)

        if serializer.is_valid():
            serializer.save()

            response_data={
                "success":True,
                "messages":"updated successfully",
                "data":serializer.data
                
            }
            return Response(response_data, status=status.HTTP_200_OK)

        response_data={
            "success":False,
            "errors":"serializer errors"
        }
        return Response(response_data, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, painting_id):

        painting=self.getPaintingObject(painting_id)

        if not painting:
            response_data={
                "success":False,
                "errors":"Painting does not exists"
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        painting.delete()

        response_data={
            "success":True,
            "messages":"deleted successfully"      
        }
        return Response(response_data, status=status.HTTP_204_NO_CONTENT)

    def post(self, request, painting_id):
        name = request.data['name']
        email = request.data['email']
        phone = request.data['phone']
        address = request.data['address']

        painting = self.getPaintingObject(painting_id)

        if not painting:
            response_data = {
                "success":False,
                "errors":{
                    "detail":"painting doesn't exist"
                }
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        owner = User.objects.get(id=painting.owner_id)
        user_from = settings.EMAIL_HOST_USER
        user_to = email
        user_subject = "Painting Wall: Purchase Request"
        user_message = "Your request has been sent to our painter.\nWe will contact you soon for further information.\n\n\n\nThank You."

        painter_from = settings.EMAIL_HOST_USER
        painter_to = owner.email
        painter_subject = "Painting Wall: Purchase Request"
        painter_message = f"I want to puchase a painting of yours. Please check all the details below.\n\nPainting id : {painting.id}\nPainting Title : {painting.title}\n\n\nMy Details - \n\nName : {name}\nEmail : {email}\nPhone : {phone}\nAddress : {address}\n\n\n\nThank You."

        try:
            send_mail(painter_subject, painter_message,
                      painter_from, [painter_to, ])
            send_mail(user_subject, user_message, user_from, [user_to, ])

        except BadHeaderError:
            response_data = {
                "success": False,
                "errors": {
                    "detail": "Somthing went wrong"
                }
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        response_data = {
            "success": True,
            "message": "Request has been sent successfully"
        }
        return Response(response_data, status=status.HTTP_200_OK)