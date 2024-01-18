import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from '@app/classes/transaction';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl: string = `${environment.apiUrl}/data/api/transactions`;
  constructor(private http: HttpClient) { }

  // A method that returns an observable of Transaction array
  getTransactions(): Observable<Transaction[]> {
    // Send a GET request to the API and get the response as JSON
    return this.http.get<Transaction[]>(this.apiUrl).pipe(
      // Use the map operator to transform the JSON data into Transactions instances
      map((data: any[]) => data.map(item => new Transaction(item.transaction_id, item.customer_card, item.transaction_summ, item.transaction_datetime, item.transaction_store)))
    );
  }

  // A method that returns an observable of Transaction by id
  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`).pipe(
      map((item: any) => new Transaction(item.transaction_id, item.customer_card, item.transaction_summ, item.transaction_datetime, item.transaction_store))
    );
  }

  // A method that updates Transaction
  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${transaction.transaction_id}/`, transaction).pipe(
      map((item: any) => new Transaction(item.transaction_id, item.customer_card, item.transaction_summ, item.transaction_datetime, item.transaction_store))
    );
  }

  // A method that deletes Transaction by id
  deleteTransaction(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // A method that creates Transaction with provided data
  createTransaction(transaction: Transaction): Observable<{}> {
    return this.http.post(`${this.apiUrl}/`, transaction);
  }
}
