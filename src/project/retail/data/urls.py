from django.urls import path
from .views import data_main

urlpatterns = [
    path('', data_main, name='data_main'),
]
