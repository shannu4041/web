import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { DataTableModule } from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { User } from '../../superadmin/models/user.model';
import { UserAccountService } from '../../services/useraccount.service';
import { Countries } from '../../superadmin/models/countries.model';
import { Roles } from '../../superadmin/models/roles.model';
import { accountModel } from '../../superadmin/models/accounts.model';
import { Subscription } from 'rxjs/Subscription';
import { UserAccounts } from '../../superadmin/models/useraccounts.model';
import { Result } from '../../superadmin/models/response.model';
import { address } from '../../models/address.model';
import { CountryService } from '../../services/countries.service';
import {search} from '../../models/search.model';
import {businessGroup} from "../../models/businessgroup.model";
import {profile} from "../../models/profile.model";
import { DropzoneConfig } from '../../mastercomponents/dropzone/dropzone.interfaces';
import { environment } from '../../../environments/environment';
import { AppCommonService } from '../../services/appcommon.service';
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';
declare let toastr;

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

//#region Properties
users: User[] = [];
countries: Countries[] = [];
roles: Roles[] = [];
allRoles: Roles[] = [];
accounts: accountModel[] = [];
bussinessgroup: businessGroup[] = [];
profiles: profile[] = [];
user: User = new User();
totalRecords: number = 0;
message:any;
bussiness_group:any;
hideAccountAndRole: boolean = true;
paging: pagingModel = new pagingModel();
showfilterPopUP: boolean = false;
showUserTable: boolean = true;
showCreateUser: boolean = false;
showUpdateUser: boolean = false;
config : DropzoneConfig =  new DropzoneConfig();
download:any;
url:any;
Status = [
    {id: "1", name: "Active"},
    {id: "0", name: "In-Active"}
  ];
  @ViewChild('cd') cd;
  @ViewChild('f') myform;
  @ViewChild('showsuccesspopup') sspopup;
  ssppopupwindow: NgbModalRef;
  @ViewChild('showfilterpopup') filterpopup;
  filterpopupwindow: NgbModalRef;
  page:any;
  @ViewChild('usersSuperAdminDT') usersSuperAdminDT;
@ViewChild('usersAdminDT') usersAdminDT;

//#endregion
//#region Constructor
constructor(private apphelper:AppHelper,private router: Router,
  private route: ActivatedRoute,
  private userAccountService: UserAccountService,
  private countryService: CountryService, private modalService: NgbModal,
  private _commonService: AppCommonService,private globals: Globals
  //private util :Util
) {
  
}

  ngOnInit() {
     this.getCountries();
        this.paging.search.status=[1];
        /* if(this.page=='superadmin'){ */
        //this.getRoles();
        //this.getAccounts();
        //this.getAllRoles();
        
			//this.getBusinessGroupsList();
			this.profileList();
		/* } */
		this.config.addRemoveLinks = true;
        this.config.url = environment.serviceurl + '/Common/fileuploadtotemp';
        
  }
  //#endregion


    // Hiding the Accounts and Roles
    hideAccountRole() {
      if (this.user.is_superadmin) {
          this.hideAccountAndRole = false;
      }
      else {
          this.hideAccountAndRole = true;
      }

  }


  toggleCreateUser(updateUser,refreshData) {
      this.showCreateUser = !this.showCreateUser;
      this.showUserTable = !this.showUserTable;
  
  if (updateUser) {
    this.showUpdateUser=!this.showUpdateUser;
  } else {
    this.showUpdateUser=false;
  }
      this.user = new User();
      this.user.userAccounts = [{ account_id: null, role_id: null }];
      if (refreshData){
          this.refreshDataTable();
      }
  }

  accountRoleSelected(index) {
      if (index == this.user.userAccounts.length - 1) {
          if (this.user.userAccounts[index].account_id != null && this.user.userAccounts[index].role_id != null) {
              this.user.userAccounts.push(new UserAccounts());
          }
      }
  }

  //#endregion
 /*  downloadUser(sortBy, sortDirection1, export_type, search1,adminOrSuperadmin) {
  this.download = {
    sortBy: sortBy,
    sortDirection: sortDirection1,
    export_type: export_type,
    search: search1
  }
      if(adminOrSuperadmin=='superadmin'){
          if(this.download.export_type=='print'){
              this.userAccountService.getDownloadSuperAdminUser(this.download).subscribe((response) => {
                  if (response.success) {
                      this.url=response.data;
                      var popupWinindow = window.open('', '_blank', 'width=900,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                      popupWinindow.document.open();
                      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + this.url + '</html>');
                      popupWinindow.document.close();
                     //toastr.success(response.message, response);
                  } else {
                      toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                  }
              }, (error) => {
                  toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
              });
          }
          else{
          this.userAccountService. getDownloadSuperAdminUser(this.download).subscribe((response) => {
              if (response.success) {
                  this.url=response.data;
                  this._commonService.downloadFileFromUrl(this.url, this.download.export_type, "UserData");
                  toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
              } else {
                  toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
              }
          }, (error) => {
              toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
          });
      }
      }
      else{
          if(this.download.export_type=='print'){
              this.userAccountService.getDownloadAdminUser(this.download).subscribe((response) => {
                  if (response.success) {
                      this.url=response.data;
                      var popupWinindow = window.open('', '_blank', 'width=900,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                      popupWinindow.document.open();
                      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + this.url + '</html>');
                      popupWinindow.document.close();
                     // toastr.success(response.message, response);
                  } else {
                      toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                  }
              }, (error) => {
                  toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
              });
          }
          else{
          this.userAccountService.getDownloadAdminUser(this.download).subscribe((response) => {
              if (response.success) {
                  this.url=response.data;
                  this._commonService.downloadFileFromUrl(this.url, this.download.export_type, "UserData");
                  toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
              } else {
                  toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
              }
          }, (error) => {
              toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
          });
      }
      }
  
  
} */

  //#region Methods

  submitForm(form: NgForm) {
    form.form.markAsTouched();
    if (form.valid) {
        if (this.user.id > 0) {
                if(this.user.userAccounts!=undefined){
                    this.user.userAccounts = this.user.userAccounts.filter(function (element, index) {
                        return (element.account_id != null && element.role_id != null)
                    });
                }
                this.userAccountService.AdminUpateUser(this.user).subscribe(
                  (response) => {
                    debugger
                      if (response.success) {
                          toastr.success(response.message, response)
                          this.getAllUsers(event,false,true);
                          this.toggleCreateUser(true,true);
                      }
                      else {
                          toastr.warning(response.message, response);
                      }
                  }, (error) => {
                      toastr.warning("Something is wrong", error);
                  }
              )         
        }
        else {
            this.userAccountService.addAdminUser(this.user).subscribe(
                (response) => {
                  debugger
                    if (response.success) {
                        toastr.success(response.message, response)
                        this.getAllUsers(event,false,true);
                        this.toggleCreateUser(false,true);
                        
                    }
                    else {
                        toastr.warning(response.message, response);
                    }
                }, (error) => {
                    toastr.warning("Something is wrong", error);
                }
            )       
        }
    }
    else {
        form.form.markAsTouched();
        toastr.warning('Please fill all mandatory details.');
        return false;
    }
}



  editUser(id: number) {
      console.log(id);
        this.userAccountService.getAdminUserById(id).subscribe((response) => {
          if (response.success) {
              this.user = response.data;
              this.bussiness_group = response.data.business_group_id;
              if (this.user.address == null) {
                  this.user.address = new address();
              }
              this.showCreateUser = true;
              this.showUserTable = false;
              this.showUpdateUser = true;
      //this.user.is_superadmin  = this.user.userAccounts.length == 0;
              this.hideAccountRole();
     /// this.user.userAccounts.push({ account_id: null, role_id: null });
          }
      });
  }

  getAllUsers(event,search=false,refresh=false) {
      //this.closepopup();
      if (this.paging == null)
          this.paging = new pagingModel();
      this.paging.pageSize = event.rows;
      this.paging.page = event.first;
      this.paging.sortBy = event.sortField;
      if (event.sortOrder == 1 || refresh == true) {
          this.paging.sortDirection = "desc";
      }
      else {
          this.paging.sortDirection = "asc";
      }
          if(refresh){
              this.paging.search={};
          } 
      this.userAccountService.getAdminUsersGrid(this.paging).subscribe((response: Result) => {
          if(response.success){
          this.users = response.data;
          this.totalRecords = response.totalrecords;
          if(search){
              this.closepopup();  
          }
        
       }
       this.closepopup();  
       if(refresh){
    this.paging.search={};
  } 
      });
  
  }

  onSearchClicked(event){
  
    this.usersAdminDT.setFirstPageAndRefreshData();
  
  this.closepopup();
  }
  refreshDataTable(){
       this.usersAdminDT.refreshData();
  }
  getCountries() {
      this.countryService.getCountries().subscribe((response: Result) => {
          this.countries = response.data;
          for (let country of this.countries) {
              country.text = country.name;
              country.value = country.id;
          }
      })
  }

  getAccounts() {
      this.userAccountService.getAccounts().subscribe((response: Result) => {
          this.accounts = response.data;
          for (let account of this.accounts) {
              account.text = account.account_name;
              account.value = account.id;
          }
      }
      )
  }
profileList() {
      this.userAccountService.profileList().subscribe((response: Result) => {
          this.profiles = response.data;
      })
  }
getBusinessGroupsList() {
    this.userAccountService.getBusinessGroupsList().subscribe((response: any) => {
      this.bussinessgroup = response.data;
    })
  }
  getRoles() {
      this.userAccountService.getRoles().subscribe((response: Result) => {
          // this.roles = this.util.convertToDropdownClass(response.data,"name","id");
          this.roles = response.data;
          for (let role of this.roles) {
              role.text = role.name;
              role.value = role.id;
          }

      })
  }
  getAllRoles() {
      this.userAccountService.getAllRoles().subscribe((response: Result) => {
          // this.roles = this.util.convertToDropdownClass(response.data,"name","id");
          this.allRoles = response.data;
          for (let role of this.roles) {
              role.text = role.name;
              role.value = role.id;
          }

      })
  }

  resetSearch(){
     
    this.usersAdminDT.setFirstPageAndRefreshData();
  
      this.paging.search={};
      this.getAllUsers(event,false, false);
      this.closepopup();
     
  }
  
  Restpassword(id: number) {
      if(this.page=='superadmin'){
    if (confirm("Are you sure reset the password") == true){
      this.userAccountService.resetpwd(id).subscribe((response: Result) => {
        this.message=this.apphelper.parseMessageFromLanguage(response.message);
        this.ssppopupwindow = this.modalService.open(this.sspopup, {size: 'sm'});
      });
    }
  }else{
    if (confirm("Are you sure reset the password") == true) {
      this.userAccountService.resetAdminpwd(id).subscribe((response: Result) => {
        this.message=this.apphelper.parseMessageFromLanguage(response.message);
        this.ssppopupwindow = this.modalService.open(this.sspopup, {size: 'sm'});
      });
    }
  }
  }
  //togglePopUp() {
//	this.showfilterPopUP = !this.showfilterPopUP;
//	if (this.showfilterPopUP){
//	  this.filterpopupwindow = this.modalService.open(this.filterpopup, {size: 'lg'});
//	} else {
          
//	  this.filterpopupwindow.close();
//	}
//  }
   
    cancelPopup(){
      this.ssppopupwindow.close();
     }
     AdminStatusChange(id:number) {
  //alert("Button Click Event");
  this.userAccountService.UserAdminStatus(id).subscribe((response:any) => {
    if (response.success) {
      toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
    }else{
      toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
    }
  })
  }
  SuperadminStatusChange(id:number) {
  //alert("Button Click Event");
  this.userAccountService.UserSuperadminStatus(id).subscribe((response:any) => {
    if (response.success) {
      toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
    }else{
      toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
    }
  })
  }
  closepopup() {
      if (this.cd){
       this.cd.closepopupdt();
      
      }
      
     }
  //#endregion


}
