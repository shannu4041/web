import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Result } from '../superadmin/models/response.model';

@Injectable()
export class CountryService {
    constructor(public http: HttpClient) { }
    getCountries() {
        return this.http.get(environment.serviceurl + '/Common/getCountries').map((response: Result) => response);
    }
}