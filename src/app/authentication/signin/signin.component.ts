import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../auth.service';
import { Router } from '@angular/router';

declare let toastr;
@Component({
  //selector: 'app-singin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  login: LoginModel = {};
  loading = false;

  constructor(private _service: CommonService, private router: Router) {
  }

  ngOnInit() {
    
  }
  onSignIn(form: NgForm) {
    if (!form.valid) {
      toastr.warning('Please fill all mandatory details.');
      return false;
    }
    this._service.login(this.login).subscribe((response) => {

      if (response.success) {
        this._service.isLoggedIn = true;
        //toastr.success('Login Successfully')
        //if (response.data.user_roles.indexOf('Admin') > -1)
        if (response.data) 
        {
          this.router.navigate(['/admin/excelupload']);
          toastr.success('Login Successfully');
        } /* else {
         // this.router.navigate(['/admin/ALJ']);
         this.router.navigate(['/common/accountslist']);
        } */
      } else {
        toastr.warning(response.message, response);
      }
    }, (error) => {
      toastr.warning("Something is wrong", error);
    });

  }


}

export class LoginModel {
  constructor(public Email?: string, public Password?: string, public RememberMe?: boolean, public token?: string) { }
}
