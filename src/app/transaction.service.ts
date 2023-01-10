import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from 'src/transaction.model';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  baseURL = 'http://localhost:4500';

  constructor(private http: HttpClient) { }

  getTransactions(params: any): Observable<Transaction[]> {
    const Url = `${this.baseURL}/api/users/transactions`;
    return this.http.get<Transaction[]>(Url, { params });
  }

  getTransaction(id: number): Observable<Transaction> {
    const Url = `${this.baseURL}/api/users/transaction/${id}`;
    return this.http.get<Transaction>(Url);
  }

  updateTransaction(payload: any): Observable<Transaction> {
    const Url = `${this.baseURL}/api/users/transaction`;
    return this.http.patch<Transaction>(Url, payload);
  }

}
