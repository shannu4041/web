import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import {AppSettings} from '../appSettings'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { pagingModel } from "../mastercomponents/shareddata/entities/pagingModel";
@Injectable()

export  class MapService {
    constructor(public http: HttpClient) { }

    getLocations(paging){
            return this.http.post(environment.serviceurl + '/admin/LocationController/getLocations', JSON.stringify(paging)).map((res: any) => res);
    }
    getTrackerList(){
        return this.http.get(environment.serviceurl+'/admin/TrackersController/getTrackersList').map((res:any)=> res);
    }
    getLocationList(){
        return this.http.get(environment.serviceurl+'/admin/LocationController/locationList').map((res:any)=> res);
    }
    getTripsLocation(id:number){
        return this.http.get(environment.serviceurl + '/admin/TripsController/getTripsByLocationId/' + id).map((res: any) => res);
    }
    getVehicleTripsLocation(id:number){
        return this.http.get(environment.serviceurl+'/admin/TrackersController/getTripInforamtion/'+id).map((res:any)=>res);
    }
    getTripsByVehicle(){
        return this.http.get(environment.serviceurl+'/admin/TripsController/getTripsByVehicle').map((res:any)=> res);
    }
    getVehicles(){
        return this.http.get(environment.serviceurl+'/admin/VehicleController/getVehicleList').map((res:any)=> res);
    }
    getBusinessGroupsList(){
        return this.http.get(environment.serviceurl+'/admin/BusinessgroupController/getBusinessGroupsList').map(res => res);
    }
    getBusinessUnitList(id){
        return this.http.get(environment.serviceurl+'/admin/BusinessgroupController/getBusinessUnitsList/'+id).map((res:any) => res);
    }
    getCurrentVehicles(data) {
        return this.http.post(environment.serviceurl+'/admin/VehicleController/getCurrentVehicles',JSON.stringify(data)).map((res:any) => res);
    }
    getCurrentTrips(data){
        return this.http.post(environment.serviceurl+'/admin/TripsController/currentTrips',JSON.stringify(data)).map((res:any) => res);
    }
}