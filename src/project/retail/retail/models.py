# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Cards(models.Model):
    customer_card_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey('PersonalData', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'cards'


class Checks(models.Model):
    transaction = models.ForeignKey('Transactions', models.DO_NOTHING)
    sku = models.ForeignKey('Sku', models.DO_NOTHING)
    sku_amount = models.DecimalField(max_digits=65535, decimal_places=65535)
    sku_summ = models.DecimalField(max_digits=65535, decimal_places=65535)
    sku_summ_paid = models.DecimalField(max_digits=65535, decimal_places=65535)
    sku_discount = models.DecimalField(max_digits=65535, decimal_places=65535)

    class Meta:
        managed = False
        db_table = 'checks'


class GroupsSku(models.Model):
    group_id = models.AutoField(primary_key=True)
    group_name = models.CharField()

    class Meta:
        managed = False
        db_table = 'groups_sku'


class PersonalData(models.Model):
    customer_id = models.AutoField(primary_key=True)
    customer_name = models.CharField()
    customer_surname = models.CharField()
    customer_primary_email = models.CharField()
    customer_primary_phone = models.DecimalField(max_digits=10, decimal_places=0)

    class Meta:
        managed = False
        db_table = 'personal_data'


class Sku(models.Model):
    sku_id = models.AutoField(primary_key=True)
    sku_name = models.CharField()
    group = models.ForeignKey(GroupsSku, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'sku'


class Stores(models.Model):
    transaction_store_id = models.AutoField()
    sku = models.ForeignKey(Sku, models.DO_NOTHING)
    sku_purchase_price = models.DecimalField(max_digits=65535, decimal_places=65535)
    sku_retail_price = models.DecimalField(max_digits=65535, decimal_places=65535)

    class Meta:
        managed = False
        db_table = 'stores'


class Transactions(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    customer_card = models.ForeignKey(Cards, models.DO_NOTHING)
    transaction_summ = models.DecimalField(max_digits=65535, decimal_places=65535)
    transaction_datetime = models.DateTimeField()
    transaction_store_id = models.AutoField()

    class Meta:
        managed = False
        db_table = 'transactions'
