import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from "../superadmin/models/user.model";

@Injectable()
export  class UserAccountService  {
    constructor(public http: HttpClient) { }
    //Getting addUser from Webservice
    addUser(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/UserController/addUser', JSON.stringify(data)).map(res => res);
    }

    addAdminUser(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/UserController/addUser', JSON.stringify(data)).map(res => res); 
    }
   
    //Getting Roles from Webservice
    getRoles(){
        return this.http.get(environment.serviceurl+'/Common/getGroupRoles').map((res:any) => res);
    }
    getAllRoles(){
        return this.http.get(environment.serviceurl+'/Common/getGroupAllRoles').map((res:any) => res);
    }
    //Getting Accounts from Webservice
    getAccounts(){
        return this.http.get(environment.serviceurl+'/superadmin/UserController/getAccountList').map((res:any) => res);
    }

    getUsersGrid(patientFilterModel) {
        return this.http.post(environment.serviceurl+'/superadmin/UserController/getUserAll',JSON.stringify(patientFilterModel)).map((res: any) => res);
    }
    getAdminUsersGrid(patientFilterModel) {
        return this.http.post(environment.serviceurl+'/admin/UserController/getUserAll',JSON.stringify(patientFilterModel)).map((res: any) => res);
    }

    getUserById(id) {
        return this.http.get(environment.serviceurl+'/superadmin/UserController/getUserById/' + id).map((res:any) => res);
    }
    getAdminUserById(id) {
        return this.http.get(environment.serviceurl+'/admin/UserController/getUserById/' + id).map((res:any) => res);
    }
    
    upateUser(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/UserController/updateUser', JSON.stringify(data)).map(res => res);  
    }

    AdminUpateUser(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/UserController/updateUser', JSON.stringify(data)).map(res => res);  
    }

    resetpwd(id) {
        return this.http.get(environment.serviceurl+'/superadmin/UserController/resetPassword/' + id).map((res:any) => res);
    }
    resetAdminpwd(id) {
        return this.http.get(environment.serviceurl+'/admin/UserController/resetPassword/' + id).map((res:any) => res);
    }
	profileList() {
        return this.http.get(environment.serviceurl + '/admin/ProfileactionController/profileList').map((res: any) => res);
    }
	getBusinessGroupsList(){
        return this.http.get(environment.serviceurl+'/admin/BusinessgroupController/getBusinessGroupsList').map(res => res);
    }
    UserAdminStatus(id){
        return this.http.get(environment.serviceurl+'/admin/UserController/UserStatus/'+id).map((res:any) => res);
    }
    UserSuperadminStatus(id){
        return this.http.get(environment.serviceurl+'/superadmin/UserController/UserStatus/'+id).map((res:any) => res);
    }

    getDownloadSuperAdminUser(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/UserController/userExport', JSON.stringify(data)).map(res => res);  
    }
    getDownloadAdminUser(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/UserController/userExport', JSON.stringify(data)).map(res => res);
    }
}