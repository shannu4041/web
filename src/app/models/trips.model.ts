export class Trips {
    id:number;
    driver_id : number;
    driver_name :string;
    driver_photo :null;
    trip_status : number;
    registration_number : string;
    vehicle_photo : string;
    trip_start:string;
    trip_end:string;
    constructor(){
        this.id = null;
        this.driver_id = null;
		this.driver_name = null;
        this.trip_status =  null;
        this.registration_number = null;
        this.vehicle_photo = null;
        this.trip_start = null;
        this.trip_end = null;
    }
}