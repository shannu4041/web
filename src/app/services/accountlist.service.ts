import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
//import { User } from "../superadmin/models/user.model";

@Injectable()
export  class AccountListService  {
    constructor(public http: HttpClient) { }
    //Getting addUser from Webservice
    /*addUser(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/UserController/addUser', JSON.stringify(data)).map(res => res)
        
    }*/
   
    getUserAccounts(patientFilterModel) {
        return this.http.post(environment.serviceurl+'/Common/getUserAccounts',JSON.stringify(patientFilterModel)).map((res: any) => res);
    }
    
}