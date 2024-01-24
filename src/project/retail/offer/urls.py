from django.urls import path, include
from .views import *


urlpatterns = [
    path('', offer_main, name='offer_main'),

]