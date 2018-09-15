import { CanActivate } from "@angular/router";
import { Injectable } from '@angular/core';
import { CommonService } from './authentication/auth.service'
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

declare let toastr;
@Injectable()
export class LogginCheckGuard implements CanActivate {
    flag:boolean=false;
    constructor(private _service: CommonService,private router: Router) { };

    canActivate(a):Observable<boolean>  {
      return  this._service.checkLogin().map((response) => {  
            if (response.success) {
				response.data.user_roles = response.data.user_roles.map(function(x){ return x.toLowerCase() });
				
                if(response.data.user_roles.indexOf(a.routeConfig.path) > -1)
                {
					this.flag=true;
					this._service.setUserData(response.data);
                }
                else{
                    toastr.warning("You don't have access to this role.");                    
                    this.router.navigate(["/"]);
                }
            }
            else{
                
                this.router.navigate(["/"]);
            }
            return this.flag;
    })
}
}
