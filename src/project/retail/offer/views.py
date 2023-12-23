from django.shortcuts import render
from django.http import HttpResponse
import psycopg2
from config import config
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
import json
import decimal
from rest_framework.decorators import api_view, permission_classes
from data.permissions import IsAdminOrReadOnly


@csrf_protect
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAdminOrReadOnly])
def offer_main(request):
    if request.method == 'POST':
        option = request.POST.get('option')
        if option == '1':
            return HttpResponse(personal_offers_by_average_check(request))
        elif option == '2':
            return HttpResponse(personal_offers_by_visits_frequency(request))
        return HttpResponse(cross_selling_offer(request))

    # return render(request, 'offer_main.html')

# personal_offers_by_average_check:
    # variant int,
    # first_date date,
    # last_date date,
    # count_transactions int,
    # coeff numeric,
    # churn_rate numeric,
    # discount_share int,
    # margin_share numeric


def personal_offers_by_average_check(request):
    params = ('variant', 'first_date', 'last_date', 'count_transactions',
              'coeff', 'churn_rate', 'discount_share', 'margin_share')
    param_values = [request.POST.get(p) for p in params]
    print(param_values)
    comm = "SELECT * from personal_offers_by_average_check( {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7});".format(
        *param_values)
    return call_stored_func(comm)


# personal_offers_by_visits_frequency:
    # FirstDate date,
    # LastDate date,
    # AddedNumberOfTransactions int,
    # MaxChurnIndex int,
    # MaximumShareTransactions int,
    # AllowableMarginShare int
def personal_offers_by_visits_frequency(request):
    params = ('first_date', 'last_date', 'added_number_of_transactions',
              'max_churn_rate', 'max_share_transactions', 'allowable_margin_share')
    param_values = [request.POST.get(p) for p in params]
    print(param_values)
    comm = "SELECT * from personal_offers_by_visits_frequency( {0}, {1}, {2}, {3}, {4}, {5});".format(
        *param_values)
    return call_stored_func(comm)


# cross_selling_offer
#         number_of_groups int,
#         maximum_churn_index numeric,
#         maximum_consumption_stability_index numeric,
#         maximum_SKU_share numeric,
#         allowable_margin_share numeric
def cross_selling_offer(request):
    params = ('number_of_groups', 'max_churn_index',
              'max_consumption_stability_index', 'max_SKU_share', 'allowable_margin_share')
    param_values = [request.POST.get(p) for p in params]
    print(param_values)
    comm = "SELECT * from cross_selling_offer( {0}, {1}, {2}, {3}, {4});".format(
        *param_values)
    return call_stored_func(comm)


def call_stored_func(comm):
    """ Connect to the PostgreSQL database server """
    res = ""
    conn = None
    try:
        params = config()
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute(comm)
        res = cur.fetchall()
        res = json.dumps(res, default=decimal_default, ensure_ascii=False)
        print(res)
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')
    return res


def decimal_default(obj):
    if isinstance(obj, decimal.Decimal):
        return float(obj)
    raise TypeError
