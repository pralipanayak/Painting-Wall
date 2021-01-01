from django.urls import path
from . import views

urlpatterns = [
    path('',views.AllPaintings.as_view()),
    path('<painting_id>',views.Painting.as_view()),
]