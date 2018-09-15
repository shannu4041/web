import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {Router, ActivatedRoute} from '@angular/router';

import { Countries } from "../../superadmin/models/countries.model";
import { User } from "../../superadmin/models/user.model";
import { address } from "../../models/address.model";

import { CountryService } from '../../services/countries.service';
import { UserProfileService } from '../../services/userprofile.service';

import { DropzoneConfig } from '../../mastercomponents/dropzone/dropzone.interfaces';
import { environment } from '../../../environments/environment';


declare let toastr;

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  //#region Properties
  user :User =  new User();
  countries: Countries[] = []
  userpassword: PasswordModel = {};
  router;
	showAChangePwrdPopUP: boolean = false;
	@ViewChild('cpassword') cppopup;
  cppopupwindow: NgbModalRef;
  @ViewChild('f') myfrm;
  config : DropzoneConfig =  new DropzoneConfig();

  //#endregion

  //#region Constructor

    constructor(router: Router, private modalService: NgbModal,private _userprofileservice: UserProfileService,
      private _countryservice: CountryService, private route:ActivatedRoute) {
        this.router = router;
       }

    ngOnInit() {
      this.getUserProfile();
      this.getCountries();
      this.config.addRemoveLinks = true;
      this.config.url = environment.serviceurl + '/Common/fileuploadtotemp';

    }

  //#endregion

  //#region Methods 
  
  getUserProfile() {
    this._userprofileservice.getUserData().subscribe((response) => {
      if (response.success) {
        this.user=response.data;
        if(response.data.address){
          this.user.address=response.data.address;
        }else{
          this.user.address=new address();
        }
      }else {
        toastr.warning(response.message, response);
      }
    });
  }

  getCountries() {
    this._countryservice.getCountries().subscribe((response) => {
      this.countries = response.data;
    });
  }

  submitForm(f: NgForm){
      if(this.myfrm.valid){
            this._userprofileservice.upateUser(this.user).subscribe((response) => {
              if (response.success) {
                toastr.success(response.message, response);
                this.router.navigate(['../'],{relativeTo:this.route});
              } else {
                toastr.warning(response.message, response);
              }
            }, (error) => {
              toastr.warning("Something is wrong", error);
            });
       
        }else{
         this.myfrm.form.markAsTouched();
         toastr.warning('Please fill all mandatory details.');
       return false;
       }
  }

  changePassword(){
    if(this.userpassword.newpassword!=this.userpassword.confirmpassword){
      toastr.warning("Confirm Password Should Match With New Password ");
      return false;
    }
        this._userprofileservice.changePassword(this.userpassword).subscribe((response) => {
          if (response.success) {
            toastr.success(response.message, response)
            this.togglePopUp()
          } else {
            toastr.warning(response.message, response);
          }
        }, (error) => {
          toastr.warning("Something is wrong", error);
        });
  }

  
  //#endregion

  //#region Events

   togglePopUp() {
      this.showAChangePwrdPopUP = !this.showAChangePwrdPopUP;
      if (this.showAChangePwrdPopUP){
        this.cppopupwindow = this.modalService.open(this.cppopup, {size: 'lg'});
      } else {
        this.cppopupwindow.close();
      }
    }

    cancelButtonClick(e){
      this.router.navigate(['../'],{relativeTo:this.route});
    }

  //#endregion

}

export class PasswordModel {
  constructor(public oldpassword?: string, public newpassword?: string,public confirmpassword?: string) { }
}
