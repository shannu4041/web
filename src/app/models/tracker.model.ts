export class trackerModel {
    id:number;
    tracker_unique_id : number;
    tracker_type :number;
    tracker_name: string;
    imei_number : string;
    status : number;
    manufacturer_id : number;
    start_date : Date;
    end_date: Date;
    hardware_version : string;
    software_version : string;
    description:string;
    pending_for_update : number;
	canStatusEdit:boolean;
    constructor(){
        this.id = null;
		this.tracker_unique_id = null;
        this.tracker_type =  null;
        this.imei_number =  null;
		this.status = null;
        this.manufacturer_id = null;
        this.start_date = null;
		this.end_date = null;
        this.hardware_version =  null;
        this.software_version = null;
        this.description =null;
        this.pending_for_update = null;
        this.tracker_name=null;
    }
}

export class trackerAssignModel {
    id:number;
    tracker_id:number;
    currently_assigned_account_id : number;
    comments:string;
    business_group_id : number;
    location_id : number;
    business_unit_id : number;
    constructor(){
        this.id = null;
        this.tracker_id=null;
        this.currently_assigned_account_id =  null;
        this.comments =  null;
        this.business_group_id = null;
        this.location_id =null;
		this.business_unit_id = null;
    }
}

export class adminTrackerModel {
    id:number;
    tracker_unique_id : number;
    tracker_name:string;
    tracker_type :number;
    imei_number : string;
    status : number;
    manufacturer_id : number;
    hardware_version : string;
    software_version : string;
    description:string;
    comments:string;
    business_group_id : number;
    location_id : number;
    business_unit_id : number;
    speed_limit:number;
	canStatusEdit:boolean;
	canEditSpecialColumns:boolean;
    constructor(){
        this.id = null;
        this.tracker_unique_id = null;
        this.tracker_name=null;
        this.tracker_type =  null;
        this.imei_number =  null;
		this.status = null;
        this.manufacturer_id = null;
        this.hardware_version =  null;
        this.software_version = null;
        this.description =null;
        this.comments =  null;
        this.business_group_id = null;
        this.location_id =null;
        this.business_unit_id = null;
        this.speed_limit=null;
    }
}
export class vehicleTrackerModel{
    id:number;
    driver_id:number;
    tracker_id:number;
    status:number;
    constructor(){
        this.id=null;
        this.driver_id=null;
        this.tracker_id=null;
        this.status=null;
    }
}