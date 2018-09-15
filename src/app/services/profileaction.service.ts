import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export  class ProfileActionService  {
    constructor(public http: HttpClient) { }
    addProfile(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/ProfileactionController/addProfile', JSON.stringify(data)).map(res => res); 
    }
    getProfileActionList(){
        return this.http.get(environment.serviceurl+'/admin/ProfileactionController/profileActionList').map((res:any) => res);
    }
    getAllProfiles()
    {
        return this.http.get(environment.serviceurl+'/admin/ProfileactionController/profileList').map((res:any) =>res);
    }
    getUpdateSingleProfiles(object)
    {
        return this.http.post(environment.serviceurl+'/admin/ProfileactionController/updateProfileActionId',object).map(res => res);
    }
    getUpdateAllProfiles(object)
    {
        return this.http.post(environment.serviceurl+'/admin/ProfileactionController/checkAllProfileAction', object).map(res => res);
    }
    getUserProfileAction()
    {
        return this.http.get(environment.serviceurl+'/Common/getUserProfileAction').map((res:any) =>res);
    }
}