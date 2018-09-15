import { address } from "./address.model";
export class Location {
    id : number;
    name :string;
    business_group_id : number;
    business_unit_id : number;
    address_id : number;
    status:number
    address_info:address;
    constructor(){
        this.id = null;
		this.name = null;
        this.address_id =  null;
        this.business_group_id =  null;
		this.business_unit_id = null;
        this.address_info = new address();
    }
}