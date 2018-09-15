export class VehicleSettingsModel {
    distance_type:number;
    speed_limit : number;
    idling_time : string;
    vehicle_distance : string;
    constructor(){
        this.distance_type = null;
        this.speed_limit = null;
        this.idling_time = null;
        this.vehicle_distance = null;
    }
}