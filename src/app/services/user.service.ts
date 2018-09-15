import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http'
import { HttpClientModule } from '@angular/common/http';
 import { HttpModule } from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    headers: any = {};
    constructor(public http: HttpClient) { }
    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    AddUserData(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/UserController/adduser', JSON.stringify(data)).map(res => res);
    }
    /*getUsers() {
        return this.http.get(environment.serviceurl+'/superadmin/UserController/getusers2').map((res: any) => res);
    }*/
    deleteUserById(id) {
        return this.http.get(environment.serviceurl+'/superadmin/UserController/deleteuserbyid/' + id).map((res:any) => res);
    }
  
    getUserById(id) {
        return this.http.get(environment.serviceurl+'/superadmin/UserController/getuserbyid/' + id).map((res:any) => res);
    }
    logout(): void {
        this.isLoggedIn = false;
    }
    getUserData() {
        return this.http.get(environment.serviceurl+'/admin/MyProfileController/getUserProfile').map((res:any) => res);
    }
    upateUser(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/MyProfileController/updateUser', JSON.stringify(data)).map(res => res);
    }
}
