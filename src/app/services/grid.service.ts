
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import {pagingModel} from '../mastercomponents/shareddata/entities/pagingModel';

@Injectable()
export class GridService {
    headers: any = {};
    constructor(public http: HttpClient) { }
    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    AddUserData(data): Observable<any> {
        let headers = new Headers();
        //headers.append('Content-Type', 'application/json')
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/UserController/adduser', JSON.stringify(data)).map(res => res)
        //.catch('some Error');
    }
    getUsers(patientFilterModel) {
        return this.http.post(environment.serviceurl+'/superadmin/UserController/getusers2',JSON.stringify(patientFilterModel)).map((res: any) => res);
    }
    deleteUserById(id) {
        return this.http.get(environment.serviceurl+'/superadmin/UserController/deleteuserbyid/' + id).map((res:any) => res);
    }
    upateUser(data) {
        return this.http.post(environment.serviceurl+'/superadmin/UserController/updateusers' + data.id, data).map((res:any) => res);
    }
    getUserById(id) {
        return this.http.get(environment.serviceurl+'/superadmin/UserController/getuserbyid/' + id).map((res:any) => res);
    }
    logout(): void {
        this.isLoggedIn = false;
    }
}
