from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','first_name','last_name','username','email']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','first_name','last_name','username','email','password']
        extra_kwargs={'password':{'write_only':True}}

    def create(self, validate_data):
        user= User.objects.create_user(
            validate_data['username'],
            first_name=validate_data['first_name'],
            last_name=validate_data['last_name'],
            email=validate_data['email'],
            password=validate_data['password']
        )

        return user

class LoginSerializer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField()

    def validate(self, data):
        user=authenticate(**data)

        print("user:",user)
        print("data:",data)

        if user and user.is_active:
            return user

        raise serializers.ValidationError("incorrect credentials")