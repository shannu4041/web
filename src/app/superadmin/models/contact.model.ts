export class contactModel
{
	id?:number;
	account_id?:number;
	reference_id?:number;
	contacttype_id?:number;
	contact_name:string;
	email:string;
	mobileno:string;
	is_primary:boolean;
	constructor()
	{
		this.id = null;
		this.contact_name = null;
		this.email = null;
		this.mobileno = null;
		this.is_primary = false;
	}
}