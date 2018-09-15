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

export  class ManageUsersService {
    constructor(public http: HttpClient) { }

        addmanagemenus(data): Observable<any> {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            return this.http.post(environment.serviceurl+'/superadmin/MenuController/createMenus', JSON.stringify(data)).map(res => res);  
        }

        updatemanagemenus(data): Observable<any> {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            return this.http.post(environment.serviceurl+'/superadmin/MenuController/updateMenus', JSON.stringify(data)).map(res => res);   
        }
        
        getManagemenus(patientFilterModeldel){
            return this.http.post(environment.serviceurl+'/superadmin/MenuController/getAllMenusList',JSON.stringify(patientFilterModeldel)).map((res: any) => res);
        }

        getMenusbyid(id:number){
            return this.http.get(environment.serviceurl+'/superadmin/MenuController/getMenusById/'+id).map((res: any) => res);
        }


}