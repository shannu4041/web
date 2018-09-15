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

export  class TrackerService {
    constructor(public http: HttpClient) { }
    
     /* Common services  */

        getManufacturers(){
            return this.http.get(environment.serviceurl+'/Common/manufacturerList').map((res: any) => res);
        }
        getTrackerStatus(){
            return this.http.get(environment.serviceurl+'/Common/getTrackerStatus').map((res: any) => res);
        }
        getAccountTrackerStatus(){
            return this.http.get(environment.serviceurl+'/Common/getAccountTrackerStatus').map((res: any) => res);
        }
        getTrackerTypes(){
            return this.http.get(environment.serviceurl+'/Common/getTrackerTypes').map((res: any) => res);
        }
        getUserAccounts(){
            return this.http.get(environment.serviceurl+'/superadmin/UserController/getAccountList').map((res: any) => res);
        }
        getBgAndLocations(id:number){
            return this.http.get(environment.serviceurl+'/superadmin/TrackermasterController/getLocationsByAccount/'+id).map((res: any) => res);
        }
        getBusinessUnits(data){
            return this.http.post(environment.serviceurl+'/superadmin/TrackermasterController/getunitsByAccount', JSON.stringify(data)).map((res: any) => res);
        }
        getAccountBgAndLocations(){
            return this.http.get(environment.serviceurl+'/admin/TrackersController/getLocationsByAccount').map((res: any) => res);
        }

        getAccountBusinessUnits(id:number){
            return this.http.get(environment.serviceurl+'/admin/BusinessgroupController/getBusinessUnitsList/'+id).map((res: any) => res);
        }
        generatedTrackerId(){
            return this.http.get(environment.serviceurl+'/Common/getTrackerIdGeneration').map((res: any) => res);
        }
        generatedTrackerIdAdmin(){
            return this.http.get(environment.serviceurl+'/Common/getTrackerIdAdminGeneration').map((res: any) => res);
        }
     /* End of Common services  */

    /* Tracker services for Super Admin Dash Board */

        addTracker(data): Observable<any> {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            return this.http.post(environment.serviceurl+'/superadmin/TrackermasterController/addMasterTracker', JSON.stringify(data)).map(res => res); 
        }
        updateTracker(data): Observable<any> {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            return this.http.post(environment.serviceurl+'/superadmin/TrackermasterController/UpdateMasterTracker', JSON.stringify(data)).map(res => res)
            
        }
        getTrackers(patientFilterModeldel){
            return this.http.post(environment.serviceurl+'/superadmin/TrackermasterController/getMasterTrackers',JSON.stringify(patientFilterModeldel)).map((res: any) => res);
        }
        getTrackerbyid(id:number){
            return this.http.get(environment.serviceurl+'/superadmin/TrackermasterController/getTrackersID/'+id).map((res: any) => res);
        }
        addAccountToTracker(data): Observable<any> {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            return this.http.post(environment.serviceurl+'/superadmin/TrackermasterController/assignTracker', JSON.stringify(data)).map(res => res)
            
        }
        getTrackerHistory(id:number){
            return this.http.get(environment.serviceurl+'/superadmin/TrackermasterController/getTrackerHistory/'+id).map((res: any) => res);
        }
        unAssignTracker(id:number){
            return this.http.get(environment.serviceurl+'/superadmin/TrackermasterController/unAssignTracker/'+id).map((res: any) => res);
        }
    /* End of Tracker services for Super Admin Dash Board */
    
    /* Tracker services for Admin Dash Board */
	
		unAssignTrackerCustomer(id:number){
            return this.http.get(environment.serviceurl+'/admin/VehicleController/unAssignedTracker/'+id).map((res: any) => res);
        }

        addAdminTracker(data): Observable<any> {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            return this.http.post(environment.serviceurl+'/admin/TrackersController/addMasterTracker', JSON.stringify(data)).map(res => res);
        }
        updateAdminTracker(data): Observable<any> {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            return this.http.post(environment.serviceurl+'/admin/TrackersController/UpdateMasterTracker', JSON.stringify(data)).map(res => res); 
        }
        getAdminTrackers(patientFilterModeldel){
            return this.http.post(environment.serviceurl+'/admin/TrackersController/getMasterTrackers',JSON.stringify(patientFilterModeldel)).map((res: any) => res);
        }
        getAdminTrackerbyid(id:number){
            return this.http.get(environment.serviceurl+'/admin/TrackersController/getTrackersID/'+id).map((res: any) => res);
        }
        updateAdminSpeedimit(data): Observable<any> {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            return this.http.post(environment.serviceurl+'/admin/TrackersController/speedLimitUpdate', JSON.stringify(data)).map(res => res);  
        }
        getDownloadTrackers(data): Observable<any>{
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            return this.http.post(environment.serviceurl+'/superadmin/TrackermasterController/trackerMasterExport', JSON.stringify(data)).map(res => res)
        }
        getDownloadTrackersAdmin(data): Observable<any>{
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            return this.http.post(environment.serviceurl+'/admin/TrackersController/trackerExport', JSON.stringify(data)).map(res => res)
        }
        getUnassignedVehicles(data): Observable<any>{
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            return this.http.post(environment.serviceurl+'/Common/getUnassignedVehicles', JSON.stringify(data)).map(res => res)
        }
        assignedVehicleToTracker(data): Observable<any>{
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            return this.http.post(environment.serviceurl+'/admin/VehicleController/AssigTrackertoVehicle', JSON.stringify(data)).map(res => res)
        }
        getVehicleTrackerHistory(id:number){
            return this.http.get(environment.serviceurl+'/admin/TrackersController/getTrackerHistory/'+id).map((res: any) => res);
        }

        returnTracker(id:number){
            return this.http.get(environment.serviceurl+'/admin/TrackersController/returnTrackerId/'+id).map((res: any) => res);
        }
        
    /* End of Tracker services for Admin Dash Board */

}