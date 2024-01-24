import { Sku } from "./sku";
import { Transaction } from "./transaction";

export class Check {
    check_id: number;
    transaction : Transaction;
    sku: Sku;
    sku_amount: BigInt;
    sku_summ: BigInt;
    sku_summ_paid: BigInt;
    sku_discount: BigInt;
  
    constructor(check_id: number, transaction: Transaction, sku: Sku, sku_amount: BigInt, sku_summ: BigInt, sku_summ_paid: BigInt, sku_discount: BigInt) {
        this.check_id = check_id;
        this.transaction  = transaction;
        this.sku = sku;
        this.sku_amount = sku_amount;
        this.sku_summ = sku_summ;
        this.sku_summ_paid = sku_summ_paid;
        this.sku_discount = sku_discount;
    }
  }