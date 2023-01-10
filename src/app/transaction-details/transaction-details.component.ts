import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../transaction.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})

export class TransactionDetailsComponent implements OnInit {
  validPattern = "[a-zA-Z0-9 ]";
  updateTransaction = this.fb.group({
    id: new FormControl({ value: '', disabled: true }),
    date: new FormControl({ value: '', disabled: true }),
    comments: new FormControl({ value: '', disabled: false }, [Validators.required])
  });

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private transactionService: TransactionService) { }

  onSubmit() {

    this.transactionService.updateTransaction(this.updateTransaction.getRawValue())
      .subscribe({
        next: (transaction) => {
          this.router.navigate(["/transaction-list"]);
        }
      });
  }

  get registerFormControl() {
    return this.updateTransaction.controls;
  }

  keyPressAlphaNumericWithCharacters(event: any) {

    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space
    if (/[a-zA-Z0-9 ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  ngOnInit() {
    this.getTransaction();
  }

  getTransaction(): void {
    this.route.params.subscribe(params => {
      this.transactionService.getTransaction(+params['id'])
        .subscribe({
          next: (transaction) => {
            const dateFormat = new DatePipe('en-US').transform(transaction.date, 'dd/MM/yyyy');
            this.updateTransaction.get('id')?.setValue(transaction.id);
            this.updateTransaction.get('date')?.setValue(dateFormat);
            this.updateTransaction.get('comments')?.setValue(transaction.Comments);
          }
        });
    });
  }
}
