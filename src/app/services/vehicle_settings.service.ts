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
export  class VehicleSettingService  {
    constructor(public http: HttpClient) { }
  
    updateSettings(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl + '/admin/AccountSettingsController/updateSettings', JSON.stringify(data)).map((res: any) => res);
    }
    getAllSettings() {
        return this.http.get(environment.serviceurl+'/admin/AccountSettingsController/getAllSettings').map((res:any) => res);
    }
    getDiatance() {
        return this.http.get(environment.serviceurl + '/admin/AccountSettingsController/getDistanceTypes').map((res: any) => res);
    }
    
}