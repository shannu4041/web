import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { DataTableModule } from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { TrackerService } from "../../services/tracker.service";

import { adminTrackerModel } from "../../models/tracker.model";
import { Globals } from '../../globals/global';
import { AppCommonService } from '../../services/appcommon.service';
import { vehicleModel } from '../../models/vehicle.model';

declare let toastr;

@Component({
  selector: 'app-trackers',
  templateUrl: './trackers.component.html',
  styleUrls: ['./trackers.component.css'],
})
export class TrackersComponent implements OnInit {

	//#region Properties

		trackerlist=[];
		manufacturers=[];
		trackerstatus=[];
		trackerstatustmp=[];
		trackertypes=[];
		useraccounts=[];
		bussinessgroup=[];
		busssinessunit=[];
		locations=[];
		trackerHistory:any={};
		speedupdatevalues:any={};
		tracker: adminTrackerModel = new adminTrackerModel();
		vehicle:vehicleModel=new vehicleModel();
		vehicles:vehicleModel[];
		paging: pagingModel = new pagingModel();
		totalRecords: number;
		showfilterPopUP: boolean = false;
		showTrackerAssignPopUP: boolean = false;
		showcreatButton:boolean=true;
		showTrackerGrid:boolean=true;
		showAddTracker: boolean = false;
		showTrackerHistory: boolean = false;
		download:any;
		url:any;
		tracker_id:any;
		unassingedVehicle:any;
		trackerId:any;
		inputDisabled:boolean=true;
		id:number;
		trackerid:number;
		label:any;
		flag:any;
		vehicleIds:any[]=[];
		businessGroupAndUnit:any;
		trackerAssignModel:any;
		@ViewChild('f') myfrm;
		@ViewChild('showfilterpopup') filterpopup;
		filterpopupwindow: NgbModalRef;
		@ViewChild('trackerassignmentpopup') trackerassignpopup;
		trackerassignpopupwindow: NgbModalRef;
		@ViewChild('showSpeedpopup') speedAssignpopup;
		speedAssignpopupwindow: NgbModalRef;
		@ViewChild('cd') cd;
		trackerUniqueId:number;
	//#endregion

	//#region Constructor
		constructor(private modalService: NgbModal,private _trackerservice:TrackerService,
			private globals: Globals,  private _commonService: AppCommonService) { }

		ngOnInit() {
			this.totalRecords = 0;
			this.getManufacturers();
			this.getTrackerStatus();
			this.getTrackerTypes();
			this.getBusinessGroupsLocations();
		}
	//#endregion

	//#region Methods
	getRandomNumber() {
		this._trackerservice.generatedTrackerIdAdmin().subscribe((response) => {
			this.inputDisabled=true;
			this.tracker.tracker_unique_id=response.data.tracker_id;
		});
	}
			getTrackerData(event,search=false,refresh=false) {
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
				this.showTrackerHistory = false;
				this._trackerservice.getAdminTrackers(this.paging).subscribe((response) => {
					console.log(response);
					if (response.success) {
						this.trackerlist = response.data;
						this.totalRecords = response.totalrecords;
						if(search){
							this.closepopup();
						}
					}
				});
			}

			getManufacturers() {
				this._trackerservice.getManufacturers().subscribe((response) => {
					this.manufacturers = response.data;
				});
			}
			getTrackerStatus() {
				this._trackerservice.getAccountTrackerStatus().subscribe((response) => {
					this.trackerstatus = response.data;
					this.trackerstatustmp = response.data;
				});
			}

			getTrackerTypes() {
				this._trackerservice.getTrackerTypes().subscribe((response) => {
					this.trackertypes = response.data;
				});
			}

			getBusinessGroupsLocations() {
				this._trackerservice.getAccountBgAndLocations().subscribe((response) => {
					this.bussinessgroup = response.data.businessgroups;
					this.locations = response.data.locations;
				});
			}

			getBusinessUnits(id:number) {
				this._trackerservice.getAccountBusinessUnits(id).subscribe((response) => {
					this.busssinessunit = response.data;
				});
			}

			editTracker(id: number) {
				this.inputDisabled=true;
				this._trackerservice.getAdminTrackerbyid(id).subscribe((response) => {
					if (response.success) {
						this.tracker = response.data;
						if (this.tracker.canStatusEdit){
							this.trackerstatustmp = this.trackerstatus.filter(trs => trs.id != 1 && trs.id != 4);
						} else {
							this.trackerstatustmp = this.trackerstatus;
						}
						this.showcreatButton=false;
						this.showTrackerGrid=false;
						this.showAddTracker=true;
						this.getBusinessUnits(this.tracker.business_group_id);
					}
				});
			}

			SubmitForm(f: NgForm) {
				if (f.valid) {
					if(this.tracker.id>0){
						this._trackerservice.updateAdminTracker(this.tracker).subscribe((response) => {
							if (response.success) {
								toastr.success(response.message, response);
								this.toggleCreateTracker();
							} else {
								toastr.warning(response.message, response);
							}
						}, (error) => {
							toastr.warning("Something is wrong", error);
						});
					}else{
						this._trackerservice.addAdminTracker(this.tracker).subscribe((response) => {
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
				} else {
					f.form.markAsTouched();
					toastr.warning('Please fill all mandatory details.');
					return false;
				}
			}

			updatespeedLimit(event,id: number,speed_limit:number,f){
				if(f.valid){
					this.speedupdatevalues={ id:id, speed_limit:speed_limit	}
					this._trackerservice.updateAdminSpeedimit(this.speedupdatevalues).subscribe((response) => {
						if (response.success) {
							this.closeSpeedPopUp();
							toastr.success(response.message, response);
							//this.toggleTrackerAssignPopUp(null);
							//this.resetSearch();
							this.getTrackerData(event,false,false);
						} else {
							toastr.warning(response.message, response);
						}
					}, (error) => {
						toastr.warning("Something is wrong", error);
					});
				}
				
			}
			
			getTrackerHistory(id: number,trackerUniqueId:number) {
				this.id=id;
				this.trackerUniqueId=trackerUniqueId;
				this._trackerservice.getVehicleTrackerHistory(id).subscribe((response) => {
					if (response.success) {
						this.trackerHistory = response.data;
						this.showTrackerGrid = false;
						this.showTrackerHistory = true;
					}else{
						this.trackerHistory = {};
						this.trackerHistory.history =[];
					}
				});
			}

			TrackerUnAssign() {
			this._trackerservice.unAssignTrackerCustomer(this.id).subscribe((response) => {
		 		if (response.success) {
					 
						toastr.success(response.message, response);
						this.getTrackerData(event,false,false);
						this.showTrackerGrid=true;
						
			//sthis.getTrackerHistory(this.trackerAssignment.tracker_id);
				} else {
						toastr.warning(response.message, response);
					}
				}, (error) => {
				toastr.warning("Something is wrong", error);
			});
			 }
	//#endregion

	//#region Events

		toggleCreateTracker(){
			this.showTrackerGrid = !this.showTrackerGrid;
			this.showAddTracker = !this.showAddTracker;
			this.tracker = new adminTrackerModel();
			this.showcreatButton=true;
			this.inputDisabled=false;
		}

		toggleTrackerHistory(){
			this.showTrackerGrid = true;
			this.showTrackerHistory = false;
			//this.trackerAssignment = new trackerAssignModel();
			this.getBusinessGroupsLocations();
		}

		// closepopup() {
		// 	this.showfilterPopUP = !this.showfilterPopUP;
		// 	if (this.showfilterPopUP){
		// 		this.filterpopupwindow = this.modalService.open(this.filterpopup, {size: 'lg'});
		// 	} else {
		// 		this.filterpopupwindow.close();
		// 	}
		// }


		closepopup() {
			if (this.cd){
				this.cd.closepopupdt();
			}
		}

		resetSearch() {
			this.paging.search={};
			this.getTrackerData(event);
			this.closepopup();
		}
	
		toggleTrackerAssignPopUp() {
			this.tracker=new adminTrackerModel();
			this.trackerAssignModel={};
			this.unassingedVehicle=null;
				this.trackerid = this.id;
				//this.tracker.speed_limit = speed_limit;
				this.getUnassignedVehicles(null,null);
					this.showTrackerAssignPopUP = true;
					if (this.showTrackerAssignPopUP){
						this.trackerassignpopupwindow = this.modalService.open(this.trackerassignpopup, {size: 'lg'});
					} else {
						this.tracker=new adminTrackerModel();
						this.trackerassignpopupwindow.close();
					}
				
		}
		closePopUp(){
			this.tracker=new adminTrackerModel();
			this.trackerAssignModel={};
			this.unassingedVehicle={};
			this.vehicleIds=[];
			this.trackerassignpopupwindow.close();
		}
		
		getUnassignedVehicles(business_group_id:number,business_unit_id:number){
			this.businessGroupAndUnit={
				business_group_id:business_group_id,
				business_unit_id:business_unit_id
			}
			this._trackerservice.getUnassignedVehicles(this.businessGroupAndUnit).subscribe((response) => {
				if (response.success) {
					  // toastr.success(response.message, response);
		   //sthis.getTrackerHistory(this.trackerAssignment.tracker_id);
		   this.vehicles=response.data;
		   for(let vehicleId of this.vehicles){
			this.label=vehicleId.registration_number;
			this.flag=vehicleId.id;
			this.vehicleIds.push({label:this.label,flag:this.flag});
		   }
			   } else {
					   toastr.warning(response.message, response);
				   }
			   }, (error) => {
			   toastr.warning("Something is wrong", error);
		   });
		}
		
	assignVehicleToTracker(){
		this.trackerAssignModel={
			tracker_id:this.id,
			vehicle:this.unassingedVehicle.flag
		}
	 this._trackerservice.assignedVehicleToTracker(this.trackerAssignModel).subscribe((response) => {
			if (response.success) {
				 toastr.success(response.message, response);
	   this.closePopUp();
	  this.getTrackerHistory(this.id,this.trackerUniqueId);
	   this.trackerAssignModel={};
	   this.unassingedVehicle={};
	   this.vehicleIds=[];
		   } else {
				   toastr.warning(response.message, response);
			   }
		   }, (error) => {
		   toastr.warning("Something is wrong", error);
	   });	
		}
		downloadTrackers(sortBy, sortDirection, export_type, search){
			this.download = {
				sortBy: sortBy,
				sortDirection: sortDirection,
				export_type: export_type,
				search: search
			}
			if(this.download.export_type=='print'){
				this._trackerservice.getDownloadTrackersAdmin(this.download).subscribe((response) => {
					if (response.success) {
						this.url=response.data;
						var popupWinindow = window.open('', '_blank', 'width=900,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
						popupWinindow.document.open();
						popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + this.url + '</html>');
						popupWinindow.document.close();
						//toastr.success(response.message, response);
					} else {
						toastr.warning(response.message, response);
					}
				}, (error) => {
					toastr.warning("Something is wrong", error);
				});
			}
			else{
				this._trackerservice.getDownloadTrackersAdmin(this.download).subscribe((response) => {
				if (response.success) {
					this.url=response.data;
					this._commonService.downloadFileFromUrl(this.url, this.download.export_type, "TrackersData");
					toastr.success(response.message, response);
				} else {
					toastr.warning(response.message, response);
				}
			}, (error) => {
				toastr.warning("Something is wrong", error);
			});
		}
		}
		toggleSpeedAssignPopUp(id:number,speed:number) {
			this.tracker=new adminTrackerModel();
			this.trackerAssignModel={};
			this.unassingedVehicle=null;
				this.trackerid = id;
				//this.tracker.speed_limit = speed_limit;
				this.getUnassignedVehicles(null,null);
					this.showTrackerAssignPopUP = true;
					if (this.showTrackerAssignPopUP){
						this.speedAssignpopupwindow = this.modalService.open(this.speedAssignpopup, {size: 'lg'});
					} else {
						this.tracker=new adminTrackerModel();
						this.speedAssignpopupwindow.close();
					}
				
		}
		closeSpeedPopUp(){
			this.tracker=new adminTrackerModel();
			this.trackerAssignModel={};
			this.unassingedVehicle={};
			this.vehicleIds=[];
			this.speedAssignpopupwindow.close();
		}

		returnTracker(event) {
			let tracker_id=this.id;
			 this._trackerservice.returnTracker(tracker_id).subscribe((response) => {
				if (response.success) {
					toastr.success(response.message, response);
					this.getTrackerData(event,false,false);
					this.showTrackerGrid=true;
				}else{
					toastr.warning(response.message, response);
				}
			}, (error) => {
				toastr.warning("Something is wrong", error);
			}); 
		} 
	//#endregion

}
