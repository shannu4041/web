import { ActionsListModel } from "./actions_list.model";
//import { PermissionsModel } from "../models/permissions.model";

export class ProfileActionModel {
    id : number;
    name :string;
    menuname:string;
    menuurl:string;
    showmenu:number;
    actions_list:ActionsListModel[];
    hasAccess:object;
   //permissions:PermissionsModel[];
    
    constructor(){
        this.id = null;
        this.name = null;
        this.menuname = null;
        this.menuurl = null;

        this.actions_list = Array<ActionsListModel>();
        this.hasAccess =  Object;
      // this.permissions = Array<PermissionsModel>();
    }
}