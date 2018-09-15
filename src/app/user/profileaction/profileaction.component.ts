import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { DataTableModule } from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { ProfileActionService } from "../../services/profileaction.service";
import { Result } from '../../superadmin/models/response.model';
import { ProfileActionModel } from "../../models/profileaction.model";
import { PermissionsModel } from "../../models/permissions.model";
import { Globals } from '../../globals/global';

declare let toastr;

@Component({
   //    selector: 'app-profileaction',
    templateUrl: './profileaction.component.html',
    styleUrls: ['./profileaction.component.css'],
})

export class profileActionComponet {

    showAddProfilePopUP: boolean = false;
	@ViewChild('aprofile') addprofile;
	addprofilepopupwindow: NgbModalRef;
    paging: pagingModel;
    profile: ProfileActionModel[] = [];
    @ViewChild('f') myfrm;
    addprofileaction: ProfileActionModel = new ProfileActionModel();
    allProfiles:ProfileActionModel[] = []
    constructor( private modalService: NgbModal,private router: Router,
        private route: ActivatedRoute,private _profileactionService: ProfileActionService,private globals: Globals ) {}

    ngOnInit() {
        this.getAllProfiles();
    }

    togglePopUp() {
        this.showAddProfilePopUP = !this.showAddProfilePopUP;
         if (this.showAddProfilePopUP){
            this.addprofilepopupwindow = this.modalService.open(this.addprofile , {size: 'lg'}
            );
         } else {
            this.addprofilepopupwindow.close();
         }
      }

    getprofileaction() {
        this._profileactionService.getProfileActionList().subscribe((response: Result) => {
            this.profile = response.data;
            this.updateProfilehasaccess(this.profile,this.allProfiles);
            console.log( this.profile[0].actions_list[0].permissions);
            console.log( this.profile[0].actions_list[1].permissions);
            console.log( this.profile[1].actions_list[0].permissions);
            console.log( this.profile[1].actions_list[1].permissions);
            //this.totalRecords = response.totalrecords;
        });
    }
    updateProfilehasaccess(a,b)
    {
        if(a.length > 0)
        {
            b.forEach(profile => {
                let r =  new Object();
                a.forEach(element => {
                    let count  = 0;
                    if(element.actions_list.length > 0)
                    {
                         element.actions_list.forEach(element1 => {
                        count += element1.permissions.filter(function(z,index){ return z.has_access == false && z.profile_id == profile.id}).length;
                       });
                    }
                    else{
                        count += 1;  
                    }
                    r["a"+profile.id+element.id] = count > 0? false:true;
                });
                profile.hasAccess = r;
            });
            console.log(b);
        }
    }
    getAllProfiles()
    {
        this._profileactionService.getAllProfiles().subscribe((response :Result) => {
            this.allProfiles = response.data;
            this.updateProfilehasaccess(this.profile,this.allProfiles);
        })
    }


    submitForm(f: NgForm){
        try{
          if(f.valid){
                this._profileactionService.addProfile(this.addprofileaction).subscribe((response) => {
                  if (response.success) {
                    toastr.success(response.message, response)
                    this.addprofileaction = new ProfileActionModel();
                    this.togglePopUp()
                    this.getprofileaction();
                  } else {
                    toastr.warning(response.message, response);
                  }
                }, (error) => {
                  toastr.warning("Something is wrong", error);
                });
           
            }else{
             f.form.markAsTouched();
             toastr.warning('Please fill all mandatory details.');
           
           }
        }
        catch(e){
        }
        return false;
    }
    updateSingleAction(event,id)
    {
        this._profileactionService.getUpdateSingleProfiles({"id":id,"has_access":event.target.checked}).subscribe((response :Result) => {
            if (response.success) {
            toastr.success(response.message, response);
          // this.profile = response.data;
                this.getprofileaction();
          } else {
            toastr.warning(response.message, response);
          }
        }, (error) => {
          toastr.warning("Something is wrong", error);
        });
        console.log(id + " -> " + event.target.checked)
    }
    updateAllAction(event,profile_id,menu_id)
    {
        console.log(event);
        console.log(profile_id);
        console.log(menu_id);
        this._profileactionService.getUpdateAllProfiles({"profile_id":this.allProfiles[profile_id].id,"menu_id":menu_id,"has_access":event.target.checked}).subscribe((response :Result) => {
        if (response.success) {
            toastr.success(response.message, response);
            // this.profile = response.data;
                this.getprofileaction();
           for (let a of this.profile.filter( a=>a.id == menu_id)[0].actions_list)
           {
               a.permissions[profile_id].has_access = event.target.checked;
                console.log(event);
                console.log(profile_id);
                console.log(menu_id);
           }
          } else {
            toastr.warning(response.message, response);
          }
        }, (error) => {
          toastr.warning("Something is wrong", error);
        });
        console.log(event);
        console.log(profile_id);
        console.log(menu_id);
    }

}