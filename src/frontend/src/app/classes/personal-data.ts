export class PersonalData {
    customer_id: number;
    customer_name: string;
    customer_surname: string;
    customer_primary_email: string;
    customer_primary_phone: string;
  
    constructor(customer_id: number, customer_name: string, customer_surname: string, customer_primary_email: string, customer_primary_phone: string) {
        this.customer_id = customer_id 
        this.customer_name = customer_name 
        this.customer_surname = customer_surname 
        this.customer_primary_email = customer_primary_email 
        this.customer_primary_phone = customer_primary_phone 
    }
  }