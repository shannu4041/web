import { Countries } from "../superadmin/accounts/country.modal";
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import {AppSettings} from '../appSettings'
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { pagingModel } from "../mastercomponents/shareddata/entities/pagingModel";
import {drivers} from "../models/drivers.model";
@Injectable()
export  class DriverService {
    constructor(public http: HttpClient) { }
    private drivers: drivers[];
    private countries: Countries[];

    addDriver(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/DriverController/addDriver', JSON.stringify(data)).map(res => res);  
    }

    updateDriver(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/DriverController/updateDriver', JSON.stringify(data)).map(res => res); 
    }
    
    genderList(){
        return this.http.get(environment.serviceurl+'/Common/genderList').map(res => res);
    }

    getCountries(){
        return this.http.get(environment.serviceurl+'/Common/getCountries').map(res => res);
    }

	getDriversAll(patientFilterModeldel){
        return this.http.post(environment.serviceurl+'/admin/DriverController/getDriversAll',JSON.stringify(patientFilterModeldel)).map((res: any) => res);
    }

    getDriverById(id:number){
        return this.http.get(environment.serviceurl+'/admin/DriverController/getDriverById/'+id).map((res: any) => res);
    }
    getBusinessGroupsList(){
        return this.http.get(environment.serviceurl+'/admin/BusinessgroupController/getBusinessGroupsList').map(res => res);
    }
    getBusinessUnitList(id){
        return this.http.get(environment.serviceurl+'/admin/BusinessgroupController/getBusinessUnitsList/'+id).map((res:any) => res);
    }
    getUnassignedVehicle(){
        return this.http.get(environment.serviceurl+'/admin/VehicleController/getUnassignedVehicle').map(res => res);
    }
    DriverStatus(id){
        return this.http.get(environment.serviceurl+'/admin/DriverController/DriverStatus/'+id).map((res:any) => res);
    }
    getDownloadDrivers(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl + '/admin/DriverController/driverExport', JSON.stringify(data)).map((res: any) => res);
    }
    getDriverHistory(id:number){
        return this.http.get(environment.serviceurl+'/admin/DriverController/getDriverHistory/'+id).map((res:any) => res);
    }
    
}