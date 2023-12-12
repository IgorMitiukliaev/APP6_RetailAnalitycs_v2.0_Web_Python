from django.shortcuts import render
from django.http import HttpResponse
import csv


def root(request):
    return render(request, 'root.html')

