from django.shortcuts import render
from django.http import HttpResponse
import csv
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response


def root(request):
    return render(request, 'root.html')

@api_view(['GET'])
def get_permissions(request):
    user = User.objects.get(username=request.user.username)
    permissions = user.get_all_permissions()
    return Response({'permissions': list(permissions)})