import {address} from "../superadmin/models/address.model";
import {contactInfo} from "../models/contactInfo.model";
import { vehicleModel } from "./vehicle.model";
	
export class drivers{
	id?:number;
	user_id?:number;
	name:string;
	dob:string;
	gender:string;
	license_number:string;
	license_expiry_date:string;
	address_id:number;
	status:number;
	business_group_id:number;
	business_unit_id:number;
	vehicle_id?:vehicleModel;
	profile_pic_path:string;
	address_info:address;
	contact_info:contactInfo;
	constructor()
	{
		this.id = null;
		this.user_id = null;
		this.name = null;
		this.dob = null;
		this.gender = null;
		this.license_number = null;
		this.license_expiry_date = null;
		this.address_id = null;
		this.status = null;
		this.business_group_id =null;
		this.business_unit_id = null;
		this.vehicle_id = null;
		this.profile_pic_path=null;
		this.address_info = new address();
		this.contact_info = new contactInfo();
		this.vehicle_id=new vehicleModel();
	}	
}

