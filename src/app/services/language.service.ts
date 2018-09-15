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
export  class LanguageService {
    constructor(public http: HttpClient) { }

    addLanguageValue(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/LanguagesController/addLanguageKey', JSON.stringify(data)).map(res => res);  
    }

    updateLanguageValue(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/LanguagesController/updateLanguageKey', JSON.stringify(data)).map(res => res);
    }

    getLanguageCodes(){
        return this.http.get(environment.serviceurl+'/Common/getLanguageCodes').map((res:any) => res);
    }

    getLanguageValues(){
        return this.http.get(environment.serviceurl+'/superadmin/LanguagesController/addLanguageKey').map((res:any) => res);
    }

	getLanguages(patientFilterModeldel){
        return this.http.post(environment.serviceurl+'/superadmin/LanguagesController/getLanguages',JSON.stringify(patientFilterModeldel)).map((res: any) => res);
    }

    getLanguageKeybyid(id:number){
        return this.http.get(environment.serviceurl+'/superadmin/LanguagesController/getwordsById/'+id).map((res: any) => res);
    }
    getMenuNames(){
        return this.http.get(environment.serviceurl+'/superadmin/LanguagesController/getMenusList').map((res: any) => res);
    }
    getLanguageKeys(id:number){
        return this.http.get(environment.serviceurl+'/Common/getLanguageKeys/'+id).map((res: any) => res);
    }
}