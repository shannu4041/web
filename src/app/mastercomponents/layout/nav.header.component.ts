import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from "../../authentication/auth.service";

declare let toastr;
@Component({
    selector: 'top-nav',
    templateUrl: './nav.header.html',
    //styleUrls: ['./signin.component.css']
})
export class HeaderComponent implements OnInit {
    UserData:any={};
    constructor(private _service:CommonService,private router:Router) { 
        
    }
    

    ngOnInit() {
        this.UserData=this._service.UserData;
    }

    onLogout(){
        this._service.logout().subscribe((response) => {
            if (response.success) {
                this._service.isLoggedIn = true;
                toastr.success('Logout Successfully')
               // this.router.navigate(['/']);
            } else {
                toastr.warning(response.message, response);
            }
        });
    }

}
