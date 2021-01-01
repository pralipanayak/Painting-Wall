from django.urls import path, include
from . import views
#from knox import views as knox_views

urlpatterns = [
    #path('',include('knox.urls')),
    path('signup',views.Signup.as_view()),
    path('login',views.Login.as_view()),
    path('user',views.CurrentUser.as_view()),
]