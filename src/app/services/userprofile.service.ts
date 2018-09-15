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
export class UserProfileService {
    headers: any = {};
    constructor(public http: HttpClient) { }
    
    getUserData() {
        return this.http.get(environment.serviceurl+'/admin/MyProfileController/getUserProfile').map((res:any) => res);
    }

    upateUser(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/MyProfileController/updateUserProfile', JSON.stringify(data)).map(res => res);
    }

    changePassword(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/Common/changepassword', JSON.stringify(data)).map(res => res);
    }

}
