import { PersonalData } from "./personal-data";

export class Card {
    customer_card_id: number;
    customer: PersonalData;
  
    constructor(customer_card_id: number, customer: PersonalData) {
        this.customer_card_id = customer_card_id 
        this.customer = customer 
    }
  }