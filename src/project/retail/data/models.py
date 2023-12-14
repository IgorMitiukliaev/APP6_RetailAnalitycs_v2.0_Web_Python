# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class PersonalData(models.Model):
    customer_id = models.AutoField(primary_key=True)
    customer_name = models.CharField(max_length=255)
    customer_surname = models.CharField(max_length=255)
    customer_primary_email = models.CharField(
        max_length=255, blank=True, null=True)
    customer_primary_phone = models.CharField(
        max_length=15, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'personal_data'


class Cards(models.Model):
    customer_card_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey('PersonalData', models.CASCADE)

    class Meta:
        managed = False
        db_table = 'cards'


class Checks(models.Model):
    check_id = models.AutoField(primary_key=True)
    transaction = models.ForeignKey('Transactions', models.CASCADE)
    sku = models.ForeignKey('Sku', models.CASCADE)
    sku_amount = models.DecimalField(max_digits=12, decimal_places=3)
    sku_summ = models.DecimalField(max_digits=12, decimal_places=3)
    sku_summ_paid = models.DecimalField(max_digits=12, decimal_places=3)
    sku_discount = models.DecimalField(max_digits=12, decimal_places=3)

    class Meta:
        managed = False
        db_table = 'checks'


class GroupsSku(models.Model):
    group_id = models.AutoField(primary_key=True)
    group_name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'groups_sku'


class Sku(models.Model):
    sku_id = models.AutoField(primary_key=True)
    sku_name = models.CharField(max_length=255)
    group = models.ForeignKey(GroupsSku, models.CASCADE)

    class Meta:
        managed = False
        db_table = 'sku'


class Stores(models.Model):
    transaction_store_id = models.AutoField(primary_key=True)
    sku = models.ForeignKey(Sku, models.CASCADE)
    sku_purchase_price = models.DecimalField(
        max_digits=12, decimal_places=3, blank=True, null=True)
    sku_retail_price = models.DecimalField(
        max_digits=12, decimal_places=3, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stores'


class Transactions(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    customer_card = models.ForeignKey(Cards, models.CASCADE)
    transaction_summ = models.DecimalField(
        max_digits=12, decimal_places=3)
    transaction_datetime = models.DateTimeField()
    transaction_store = models.ForeignKey('Stores', models.CASCADE)

    class Meta:
        managed = False
        db_table = 'transactions'
