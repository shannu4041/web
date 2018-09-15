import { address } from "./address.model";
export class businessUnit {
    id : number;
    unit_name :string;
    group_id : number;
    address_id : number;
    is_active : number;
    unit_address:address;
    constructor(){
        this.id = null;
		this.unit_name = null;
        this.group_id =  null;
        this.address_id =  null;
		this.is_active = null;
        this.unit_address = new address();
    }
}