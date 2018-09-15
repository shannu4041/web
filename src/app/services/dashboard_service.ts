import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Paginator } from '../mastercomponents/ngbcomponents/paginator/paginator';

@Injectable()
export class DashboardService {
    constructor(public http: HttpClient) {
    }
    
    getDashboardData() {
        return this.http.get(environment.serviceurl+'/admin/DashboardController/getDashboardData').map((res: any) => res);
    }
    
    getBusinessGroupList() {
        return this.http.get(environment.serviceurl + '/admin/BusinessgroupController/getBusinessGroupsList').map((res: any) => res);
    }
  
    getDriverService(){
        return this.http.get(environment.serviceurl+'/Common/getUnassignedDriver/').map((res: any) => res);
    }
    getTrackerService(){
        return this.http.get(environment.serviceurl+'/Common/getUnassignedTracker').map((res: any) => res);
    }  
}