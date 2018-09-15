import { address } from "./address.model";
import { contactModel } from "./contact.model";
export class accountModel  { 
    id?:number;
    company_name:string;
    status?:number;
    sameasbusiness:boolean;
    billing_address : address;
    business_address: address;
    user_email:string;
    user_password:string;
    user_firstname:string;
    user_lastname :string;
    contactaccountModel:contactModel[];
    emailaddress:string;
    phonenumber:string;
    account_name:string;
    text:string;
    value:number;
    deletedcontactidinfo:Array<Number>;
    constructor()
    {
     this.billing_address = new address();
     this.business_address = new address();
     this.contactaccountModel = Array<contactModel>();
    }
    
    }