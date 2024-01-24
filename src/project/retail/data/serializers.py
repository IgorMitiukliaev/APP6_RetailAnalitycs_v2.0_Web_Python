from rest_framework import serializers
from .models import *
# from rest_framework.response import Response


# class PersonalDataSerializer(serializers.Serializer):
#     customer_id = serializers.PrimaryKeyRelatedField(
#         queryset=PersonalData.objects.all(), required=False)
#     customer_name = serializers.CharField(max_length=255, required=False)
#     customer_surname = serializers.CharField(max_length=255, required=False)
#     customer_primary_email = serializers.CharField(max_length=255, required=False)
#     customer_primary_phone = serializers.CharField(max_length=15, required=False)

# def create(self, validated_data):
#     return PersonalData.objects.create(**validated_data)

# def update(self, instance, validated_data):
#     instance.customer_name = validated_data.get('customer_name', instance.customer_name)
#     instance.customer_surname = validated_data.get('customer_surname', instance.customer_surname)
#     instance.customer_primary_email = validated_data.get('customer_primary_email', instance.customer_primary_email)
#     instance.customer_primary_phone = validated_data.get('customer_primary_phone', instance.customer_primary_phone)
#     instance.save()
#     return instance


class PersonalDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalData
        fields = "__all__"


class CardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cards
        fields = "__all__"


class ChecksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checks
        fields = "__all__"


class GroupsSkuSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupsSku
        fields = "__all__"


class SKUSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sku
        fields = "__all__"


class StoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stores
        fields = "__all__"


class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = "__all__"
