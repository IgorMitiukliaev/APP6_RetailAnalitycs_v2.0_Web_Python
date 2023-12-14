from django.shortcuts import render
from data.models import Checks


def data_main(request):
    return render(request, 'data_main.html')