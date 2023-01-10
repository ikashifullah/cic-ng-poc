import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Transaction } from 'src/transaction.model';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];

  displayedColumns: string[] = ['id', 'date', 'Comments', 'star'];

  dateParams = this.fb.group({
    startDate: new FormControl({ value: new Date('12/15/2019'), disabled: false }, [Validators.required]),
    endDate: new FormControl({ value: new Date('01/01/2023'), disabled: false }, [Validators.required]),
  });

  constructor(private fb: FormBuilder, private transactionService: TransactionService) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(): void {
    const startDate = this._getFormattedDate(this.dateParams.value.startDate);
    const endDate = this._getFormattedDate(this.dateParams.value.endDate);
    this.transactionService.getTransactions({ startDate, endDate }).subscribe((response) => {
      this.transactions = response;
    });
  }

  onSearch() {
    this.getTransactions();
  }

  _getFormattedDate(date: any) {
    return new DatePipe('en-US').transform(date, 'yyyy-MM-dd')
  }
}
