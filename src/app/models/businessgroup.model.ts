import { address } from "./address.model";
import { businessUnit } from "./businessunit.model";
export class businessGroup {
    id : number;
    group_name :string;
    address_id : number;
    account_id : number;
    is_mastergroup : boolean;
    is_active : number;
    group_address:address;
    business_units:businessUnit[];
    deletedBusinessUnits:Array<Number>;
    constructor(){
        this.id = null;
		this.group_name = null;
        this.address_id =  null;
        this.account_id =  null;
		this.is_mastergroup = false;
		this.is_active = null;
        this.group_address = new address();
        this.business_units = Array<businessUnit>();
    }
}