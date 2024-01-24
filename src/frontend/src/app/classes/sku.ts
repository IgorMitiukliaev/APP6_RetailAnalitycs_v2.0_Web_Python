import { SkuGroup } from "./sku-group";

export class Sku {
    sku_id: number;
    sku_name: string;
    group: SkuGroup;
  
    constructor(sku_id: number, sku_name: string, group: SkuGroup) {
        this.sku_id = sku_id;
        this.sku_name = sku_name;
        this.group = group;
    }
  }