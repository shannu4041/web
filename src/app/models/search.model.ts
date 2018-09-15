export class search {
     business_group_id?: number;
     business_unit_id?: number;
     location_id?: number;
     status?:Array<number>;
     account_name?:string;
     contact_email?:string;
     country?:Array<number>;
     name?:string;
     role?:Array<number>;
	 license_validity?:string;
   	 driver_name?:string;
     registration_no?:string;
     vehicles_status?:Array<number>;
     menuids?:Array<number>;
     imei_number?:string;
     hardware_version ?: string;
     software_version ?: string;
     tracker_type ?:number;
     profile_id ?:number;
     fromdate?:string;
     todate?:string;
     searchoption?:boolean;
     allcases?:boolean;
     mycases?:boolean;
     cgid?:string;
     customer_full_name?:string;
     username?:string;
}