import { PermissionsModel } from "../models/permissions.model";

export class ActionsListModel{
    id?:number;
	action_name:string;
	description:string;
	display_name:string;
	menu_id:number;
	permissions:PermissionsModel[];

    constructor()
	{
		this.id = null;
		this.action_name = null;
		this.menu_id = null;
		this.description = null;
		this.display_name = null;
		this.permissions = Array<PermissionsModel>();		
	}
}