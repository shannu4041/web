import { CommonService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from '../signin/signin.component';
import { Router } from '@angular/router';
declare let toastr;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  register:any={}
    constructor(private _service: CommonService, private router: Router) { }

  ngOnInit() {
  }

 
onSignUp(form: NgForm) {
  if (!form.valid) {
    toastr.warning('Please fill all mandatory details.');
    return false;
  }
  if(this.register.Password!=this.register.cnfpassword){
    toastr.warning('Password not matched with Confirm Password');
    return false;
  }
  this._service.register(this.register).subscribe((response) => {

    if (response.success) {
      toastr.success('Registred Successfully')
      this.router.navigate(['/']);
      
    } else {
      toastr.warning(response.message, response);
    }
  }, (error) => {
    toastr.warning("Something is wrong", error);
  });

}

}


export class RegistrationModel {
  constructor(public Email?: string, public Password?: string, public RememberMe?: boolean, public token?: string) { }
}
