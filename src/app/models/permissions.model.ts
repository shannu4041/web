export class PermissionsModel{
    id?:number;
	profile_id:number;
    action_id:number;
    has_access:number;
    name:string;
    //description:null;
    menu_id:number;
    profiles_id:number;
    constructor()
	{
        this.id = null;
        this.profile_id = null;
        this.profiles_id = null;
        this.action_id = null;
        this.has_access = null;
        this.name = null;
        this.menu_id = null;
		
	}
}