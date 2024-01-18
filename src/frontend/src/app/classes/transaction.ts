import { Card } from "./card";
import { Store } from "./store";

export class Transaction {
    transaction_id: number;
    customer_card: Card;
    transaction_summ: BigInt;
    transaction_datetime: Date;
    transaction_store: Store;
  
    constructor(transaction_id: number, customer_card: Card, transaction_summ: BigInt, transaction_datetime: Date, transaction_store: Store) {
        this.transaction_id = transaction_id;
        this.customer_card = customer_card;
        this.transaction_summ = transaction_summ;
        this.transaction_datetime = transaction_datetime;
        this.transaction_store = transaction_store;
    }
  }

  