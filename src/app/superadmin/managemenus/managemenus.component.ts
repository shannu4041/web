import { Component, OnInit ,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { DataTableModule } from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Globals } from '../../globals/global';
import { ManageUsersService } from "../../services/managemenus.service";
import { ManageMenusModel } from "../../models/managemenus.model";
import {ActionNames} from "../../models/managemenus.model";

declare let toastr;

@Component({
  selector: 'app-managemenus',
  templateUrl: './managemenus.component.html',
  styleUrls: ['./managemenus.component.css']
  
})
export class ManagemenusComponent implements OnInit {


  managemenuslist:ManageMenusModel[]=[];
  //actions_name = [];
 // actions_name = [{value: ''}];
  managemenus: ManageMenusModel = new ManageMenusModel();
  paging: pagingModel = new pagingModel();
  totalRecords: number;
  @ViewChild('cd') cd;
	showManageusersGrid:boolean=true;
  showAddManageUsers: boolean = false;
  showcreatButton:boolean=true;
  deletedActionsInfo = [];

constructor(private router: Router, private route: ActivatedRoute,
            private _managemenuservice:ManageUsersService,private globals: Globals) { }
 
  ngOnInit() {
    this.totalRecords = 0;
  }

  getManageMenus(event,search=false,refresh=false) {
    if (this.paging == null)
      this.paging = new pagingModel();
    this.paging.pageSize = event.rows;
    this.paging.page = event.first;
    this.paging.sortBy = event.sortField;
    if (event.sortOrder == 1) {
      this.paging.sortDirection = "asc";
    }
    else {
      this.paging.sortDirection = "desc";
    }
    if(refresh){
      this.paging.search={};
    }
    this._managemenuservice.getManagemenus(this.paging).subscribe((response) => {
      if (response.success) {
        this.managemenuslist = response.data;
        this.totalRecords = response.totalrecords;
        if(search){
          this.closepopup();
        }
      }
    });
  }

  SubmitForm(f: NgForm) {
    if (f.valid) {
       if(this.managemenus.id>0){
         this.managemenus.deletedActionsInfo = this.deletedActionsInfo;
         this._managemenuservice.updatemanagemenus(this.managemenus).subscribe((response) => {
           if (response.success) {
             toastr.success(response.message, response);
             this.toggleCreateTracker();
           } else {
             toastr.warning(response.message, response);
           }
         }, (error) => {
           toastr.warning("Something is wrong", error);
         });
       }
       else{
         this._managemenuservice.addmanagemenus(this.managemenus).subscribe((response) => {
           if (response.success) {
             toastr.success(response.message, response);
             this.toggleCreateTracker();
           } else {
             toastr.warning(response.message, response);
           }
         }, (error) => {
           toastr.warning("Something is wrong", error);
         });
       }
      
        //  this._managemenuservice.addmanagemenus(this.managemenus).subscribe((response) => {
        //     if (response.success) {
        //        toastr.success(response.message, response);
        //        this.toggleCreateTracker();
        //      } else {
        //        toastr.warning(response.message, response);
        //      }
        //    }, (error) => {
        //      toastr.warning("Something is wrong", error);
        //    });
         }
     else {
      f.form.markAsTouched();
      toastr.warning('Please fill all mandatory details.');
      return false;
    }
  }

  editManageUsers(id: number) {
    this._managemenuservice.getMenusbyid(id).subscribe((response) => {
      if (response.success) {
        this.managemenus = response.data;
        this.toggleCreateTracker(true);
       // this.showManageusersGrid=false;
        //this.showAddManageUsers=true;
        //this.showcreatButton=false;
      }
    });
  }


  toggleCreateTracker(isEdit=false){
    this.showManageusersGrid = !this.showManageusersGrid;
    this.showAddManageUsers = !this.showAddManageUsers;
    if(!isEdit){
      this.managemenus = new ManageMenusModel();
      this.showcreatButton=true;
      this.managemenus.actions_info = Array<ActionNames>();
			this.managemenus.actions_info.push(new ActionNames());
    }else{
      this.showcreatButton=false;
    }
   
  }
  addActions() {
		this.managemenus.actions_info.push(new ActionNames());
  }
  deleteContactInfo(e, i) {
		let id = this.managemenus.actions_info[i].id;
		let rmobj = this.managemenus.actions_info[i];
		this.managemenus.actions_info = this.managemenus.actions_info.filter(obj => obj !== rmobj);
		if (this.managemenus.actions_info.length == 0) {
			this.addActions();
		//	this.isdefaultchange(0);
		}
		 if (id != null)
			this.deletedActionsInfo.push(id);
	}

  closepopup() {
    if (this.cd){
      this.cd.closepopupdt();
    }
  }

  resetSearch() {
    this.paging.search={};
    this.getManageMenus(event);
    this.closepopup();
  }

}
