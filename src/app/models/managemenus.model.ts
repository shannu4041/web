export class ManageMenusModel{
    id?:number;
    menuname:string;
    //action_name?:string;
    menuurl:string;
    showmenu:number;
    //actions_name?:any;
    actions_info:ActionNames[];
    deletedActionsInfo:Array<Number>;
    constructor(){
        this.id = null;
        this.menuname = null;
        //this.action_name = null;
        this.menuurl = null;
        this.showmenu = null;
        //this.actions_name = null;
        this.actions_info =  Array<ActionNames>();
        this.deletedActionsInfo = Array<Number>();
    }

}

export class ActionNames{
    id?:number;
    action_name?:string;
    description?:string;
    constructor(){
        this.id = null;
        this.action_name = null;
        this.description = null;
    }
}