import { Sku } from "./sku";

export class Store {
    transaction_store_id: number;
    sku: Sku;
    sku_purchase_price: number;
    sku_retail_price:number;
  
    constructor(transaction_store_id: number, sku: Sku, sku_purchase_price: number, sku_retail_price: number) {
        this.transaction_store_id = transaction_store_id
        this.sku = sku
        this.sku_purchase_price = sku_purchase_price
        this.sku_retail_price = sku_retail_price
    }
  }
