from django.contrib import admin
from .models import PersonalData, Cards, Checks, GroupsSku, Sku, Stores, Transactions

# Register your models here.

modelsList = [PersonalData, Cards, Checks, GroupsSku, Sku, Stores, Transactions]
admin.site.register(modelsList)