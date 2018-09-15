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
export  class AllCasesService {
    constructor(public http: HttpClient) { }
    private users: AccountModal[];
    private countries: Countries[];

    
   
	getAllCases(patientFilterModeldel){
        /* let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers }); */
        return this.http.post(environment.serviceurl+'/admin/CasesController/getAllCases',JSON.stringify(patientFilterModeldel)).map((res: any) => res);
    }
    
}