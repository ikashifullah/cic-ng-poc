export interface Sender {
    firstName: string;
      lastName: string;
      dateOfBirth: string;
      IDNumber: string;
  }
  
  export interface Recipient {
    firstName: string;
    lastName: string;
    email: string;
    accountNumber: string;
    bank: string;
  }
  
  export interface Transaction {
    sender: Sender;
    recipient: Recipient;
    status: string;
    createdAt: string;
    _id: string;
    id: string;
    date: string;
    Amount: number;
    CurrencyCd: string;
    Comments: string;
  }