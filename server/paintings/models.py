from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Paintings(models.Model):
    owner=models.ForeignKey(User,related_name="owner",on_delete=models.CASCADE,null=True)
    title=models.CharField(max_length=100,blank=True)
    description=models.CharField(max_length=500,blank=True)
    image=models.ImageField(upload_to='images/',blank=True)
    price=models.IntegerField(default=0)
    createdAt=models.DateTimeField(auto_now_add=True)
    updatedAt=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title                       
                                             