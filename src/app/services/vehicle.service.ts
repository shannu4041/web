import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Paginator } from '../mastercomponents/ngbcomponents/paginator/paginator';

@Injectable()
export class VehicleService {
    constructor(public http: HttpClient) {
    }
    addViechicle(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl + '/admin/VehicleController/addUpdateVehicle', JSON.stringify(data)).map(res => res);
    }
    getVehicleGrid(Paging) {
        return this.http.post(environment.serviceurl + '/admin/VehicleController/getVehicles', JSON.stringify(Paging)).map((res: any) => res);
    }
    upateVechicle(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl + '/admin/VehicleController/addUpdateVehicle/', JSON.stringify(data)).map((res: any) => res);
    }
    statusChanged(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl + '/admin/VehicleController/updateVehicleStatus/', JSON.stringify(data)).map((res: any) => res);
    }
    getBusinessGroupList() {
        return this.http.get(environment.serviceurl + '/admin/BusinessgroupController/getBusinessGroupsList').map((res: any) => res);
    }
    getBusinessUnitList(id) {
        return this.http.get(environment.serviceurl + '/admin/BusinessgroupController/getBusinessUnitsList/' + id).map((res: any) => res);
    }
    getVehicleById(id: number) {
        return this.http.get(environment.serviceurl + '/admin/VehicleController/getVehiclebyID/' + id).map((res: any) => res);
    }
    getDownloadVehicle(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl + '/admin/VehicleController/vehicleExport', JSON.stringify(data)).map((res: any) => res);
    }
    getStatusId(id: number) {
        return this.http.get(environment.serviceurl + '/admin/VehicleController/getVehiclebyID/' + id).map((res: any) => res);
    }
    getDriverService(){
        return this.http.get(environment.serviceurl+'/Common/getUnassignedDriver/').map((res: any) => res);
    }
    getTrackerService(){
        return this.http.get(environment.serviceurl+'/Common/getUnassignedTracker/').map((res: any) => res);
    }
    assignDriverToVehicle(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/VehicleController/AssignedDrivertoVehicle', JSON.stringify(data)).map(res => res);
    }
    assignTrackerToVehicle(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/VehicleController/AssignedTrackertoVehicle', JSON.stringify(data)).map(res => res); 
    }
    getVechicleDriverHistory(id:number){
        return this.http.get(environment.serviceurl + '/admin/VehicleController/getVehicleHistory/' + id).map((res: any) => res);
    }
    getVechicleTrackerHistory(id:number){
        return this.http.get(environment.serviceurl + '/admin/VehicleController/getVehicleTraHistory/' + id).map((res: any) => res);
    }
    getUnassignedDrivers(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/Common/getUnassignedDriver/',  JSON.stringify(data)).map((res: any) => res);
    }
    getunAssignedTrackerById(id:number){
        return this.http.get(environment.serviceurl + '/admin/VehicleController/unAssignedTracker/' + id).map((res: any) => res);
    }
    getunAssignedDriverById(id:number){
        return this.http.get(environment.serviceurl + '/admin/VehicleController/unAssignedDriver/' + id).map((res: any) => res);
    }
    getUnassignedTrackers(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/Common/getUnassignedTracker/',  JSON.stringify(data)).map((res: any) => res);
    }
}