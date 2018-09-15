import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import {AppSettings} from '../appSettings'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export  class SettingsService {
    constructor(public http: HttpClient) { }

    addBusinessGroup(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/BusinessgroupController/addBusinessGroup', JSON.stringify(data)).map(res => res);
    }
    getBusinessGroups(){
        return this.http.get(environment.serviceurl+'/admin/BusinessgroupController/getBusinessGroups/').map((res:any) => res);
    }
    getBusinessByid(id:number){
        return this.http.get(environment.serviceurl+'/admin/BusinessgroupController/getBusinessGroupById/'+id).map((res: any) => res);
    }
    updateBusinessGroup(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/BusinessgroupController/updateBusinessGroup', JSON.stringify(data)).map(res => res); 
    }

    addBusinessUnit(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/BusinessgroupController/addUpdateBusinessUnit', JSON.stringify(data)).map(res => res);  
    }
    getBusinessUnitByid(id:number){
        return this.http.get(environment.serviceurl+'/admin/BusinessgroupController/getBusinessUnitById/'+id).map((res: any) => res);
    }
    deleteBusinessGroup(id:number){
        return this.http.get(environment.serviceurl+'/admin/BusinessgroupController/deleteBusinessGroup/'+id).map((res: any) => res);
    }
    deleteBusinessUnit(id:number){
        return this.http.get(environment.serviceurl+'/admin/BusinessgroupController/deleteBusinessUnit/'+id).map((res: any) => res);
    }
   /* updateAccount(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/AccountController/updateAccount', JSON.stringify(data)).map(res => res);
    }
    
    getCountries(){
        return this.http.get(environment.serviceurl+'/Common/getCountries').map(res => res);
    }

	getAccounts(patientFilterModeldel){
        return this.http.post(environment.serviceurl+'/superadmin/AccountController/getAccounts',JSON.stringify(patientFilterModeldel)).map((res: any) => res);
    }

    getAccountbyid(id:number){
        return this.http.get(environment.serviceurl+'/superadmin/AccountController/getaccountbyid/'+id).map((res: any) => res);
    }*/
}