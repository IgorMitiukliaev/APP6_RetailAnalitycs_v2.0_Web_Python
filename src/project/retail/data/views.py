from django.shortcuts import render


def data_main(request):
    return render(request, 'data_main.html')