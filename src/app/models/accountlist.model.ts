export class AccountListModel{
    id?:number;
	account_name:string;
	account_id:number;
	account_encrypt_id:any;
	account_status:number;
    constructor()
	{
		this.id = null;
		this.account_name = null;
		this.account_id = null;
		this.account_encrypt_id = null;
		this.account_status = null;
	}
}