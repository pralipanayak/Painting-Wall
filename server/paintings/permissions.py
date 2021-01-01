from rest_framework.permissions import BasePermission

class IsReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == "GET":
            return True

        return request.user and request.user.is_authenticated

class IsReadOnlyAndRequest(BasePermission):
    def has_permission(self, request, view):
        if request.method == "GET" or request.method == "POST":
            return True
        
        return request.user and request.user.is_authenticated