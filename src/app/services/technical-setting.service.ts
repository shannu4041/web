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
export  class TechnicalSettingService  {
    constructor(public http: HttpClient) { }
    
    //Getting addUser from Webservice
   /* addProfile(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/ProfileactionController/addProfile', JSON.stringify(data)).map(res => res)
        
    }*/
   
    updateSettings(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl + '/superadmin/SettingsController/updateSettings', JSON.stringify(data)).map((res: any) => res);
    }

    getAllSettings() {
        return this.http.get(environment.serviceurl+'/superadmin/SettingsController/getAllSettings').map((res:any) => res);
    }
    
}