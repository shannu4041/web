import { AccountModal } from "../superadmin/accounts/account.modal";
import { Countries } from "../superadmin/accounts/country.modal";
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
export  class AddqueueService {
    constructor(public http: HttpClient) { }
    private users: AccountModal[];
    private countries: Countries[];

    /* addAcount(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/AccountController/addAccount', JSON.stringify(data)).map(res => res);  
    } */
    /* getUploadFile(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/FileUploadController/uploadFile', JSON.stringify(data)).map(res => res);
    } */
   
	getAllQueue(patientFilterModeldel){
        /* let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers }); */
        return this.http.post(environment.serviceurl+'/admin/QueueController/getAllQueue',JSON.stringify(patientFilterModeldel)).map((res: any) => res);
    }
    
    getCGIDetailsId(id:number){
        return this.http.get(environment.serviceurl+'/admin/QueueController/getCGIDetails/'+id).map((res: any) => res);
    }

    updateCGIStatus(id:number){
        return this.http.get(environment.serviceurl+'/admin/QueueController/updateCGIStatus/'+id).map((res: any) => res);
    }
    
}