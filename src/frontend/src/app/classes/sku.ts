export class Sku {
    sku_id: number;
    sku_name: string;
    group: number;
  
    constructor(sku_id: number, sku_name: string, group: number) {
        this.sku_id = sku_id;
        this.sku_name = sku_name;
        this.group = group;
    }
  }