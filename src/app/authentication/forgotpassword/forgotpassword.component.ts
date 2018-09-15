import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../auth.service';
import { Router } from '@angular/router';

declare let toastr;
@Component({
    //selector: 'app-singin',
    templateUrl: './forgotpassword.html',
    //styleUrls: ['./signin.component.css']
})
export class ForgotPassword implements OnInit {
	login: LoginModel = {};
	
	 
 constructor(private _service: CommonService, private router: Router) { }
	
    ngOnInit() {
       // toastr.success('Forgot Password Page Open')
    }
    
    onForgot(f: NgForm){
        if(!f.valid)
        {
            toastr.warning('Please fill all mandatory details.');
            return false;
        }

        this._service.forgotData(this.login).subscribe((response) => {
            if (response.success) {
                // toastr.success('Login Successfully')
                this.router.navigate(['/admin']);
              } else {
                  toastr.warning(response.message, response);
              }
            }, (error) => {
              
                toastr.warning("Somting Went Wrong");
               
          });
		

}
}

export class LoginModel {
    constructor(public email?: string) { }
}
