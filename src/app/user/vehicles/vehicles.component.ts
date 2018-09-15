import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { DataTableModule } from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { VehicleService } from "../../services/vehicle.service";
import { vehicleModel, vehicleDriverHistory, vehicleTrackerHistory, trackerHistory } from "../../models/vehicle.model";
import { businessGroup } from "../../models/businessgroup.model";
import { businessUnit } from "../../models/businessunit.model";
import { contactModel } from "../../superadmin/models/contact.model";
import { environment } from '../../../environments/environment';
import { DropzoneConfig } from '../../mastercomponents/dropzone/dropzone.interfaces';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppCommonService } from '../../services/appcommon.service';
import { Globals } from '../../globals/global';
import { trackerAssignModel, vehicleTrackerModel } from '../../models/tracker.model';
import { drivers } from '../../models/drivers.model';

declare let toastr;

@Component({
	selector: 'app-vehicles',
	templateUrl: './vehicles.component.html',
	styleUrls: ['./vehicles.component.css']
})

export class VehiclesComponent implements OnInit {

	//#region Declarations
	vehicleList: any;
	vehicle: vehicleModel = new vehicleModel();
	businessGroup: businessGroup[];
	businessUnit: businessUnit[];
	paging: pagingModel = new pagingModel();;
	totalRecords: number = 0;
	showform: boolean = false;
	showTable: boolean = true;
	showUpdateButton: boolean = false;
	old: number = null;
	new: number = null;
	year: any;
	years: any = [];
	editMode = false;
	date = new Date();
	download: any = {};
	data:any;
	url:any;
	drivers:drivers[] = [];
	showVehicleHistory:boolean=false;
	showVehicleTrackerAssignPopUP :boolean=false;
	showVehicleDriverAssignPopUP :boolean=false;
	driverHistory:drivers=new drivers();
	trackerHistory:trackerHistory=new trackerHistory();
	vehicleTrackerHistory:vehicleTrackerHistory[]=[];
	vehicleDriverHistory:vehicleDriverHistory[]=[];
	vehicleDriverHistoryId:number;
	vehicleTrackerHistoryId:number;
	historyOfDriver:vehicleDriverHistory=new vehicleDriverHistory();
	trackerAssignment:trackerAssignModel[]= [];
	assignTrackersToVehicles:vehicleTrackerModel=new vehicleTrackerModel();
	Status = [
		{ status: 1, status_name: "Active" },
		{ status: 2, status_name: "In Active" },
		{ status: 3, status_name: "De Active" }
	];
	deletedcontactidinfo = [];
	@ViewChild('f') myfrm;
	@ViewChild('cd') cd;
	config: DropzoneConfig = new DropzoneConfig();
	@ViewChild('showsuccesspopup') sspopup;
	ssppopupwindow: NgbModalRef;
	@ViewChild('showDriverhistorypopup') driverassignpopup;
	driverAssignpopupwindow: NgbModalRef;
	@ViewChild('showTrackerhistorypopup') trackerassignpopup;
	trackerassignpopupwindow: NgbModalRef;
	//#endregion
	constructor(private router: Router, private route: ActivatedRoute, private _vehicleService: VehicleService,
		private modalService: NgbModal, private globals: Globals,
		private _commonService: AppCommonService) {

	}

	ngOnInit() {
		this.getYears();
		//this.getBusinessGroups();
		this.config.addRemoveLinks = true;
		this.config.url = environment.serviceurl + '/Common/fileuploadtotemp';
		/* this.getStatus();*/
		

	}
	//#region constructor

	//#region 
	// Get Vehicles for grid
	getVehicles(event, search = false, refresh = false) {
		this.closepopup();
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
		 if (refresh) {
		 	this.paging.search = {};
		}
		this._vehicleService.getVehicleGrid(this.paging).subscribe((response: any) => {
			if (response.success) {
				this.vehicleList = response.data;
				this.totalRecords = response.totalrecords;
				if (search) {
					this.closepopup();
				}
			}
		});
	}
	downloadVehicle(sortBy, sortDirection1, export_type, search1) {
		this.download = {
			sortBy: sortBy,
			sortDirection: sortDirection1,
			export_type: export_type,
			search: search1
		}
		if(this.download.export_type=='print'){
			this._vehicleService.getDownloadVehicle(this.download).subscribe((response) => {
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
		this._vehicleService.getDownloadVehicle(this.download).subscribe((response) => {
			if (response.success) {
				this.url=response.data;
				//window.location.href=this.url;
				//window.open(this.url,"_blank");
				this._commonService.downloadFileFromUrl(this.url, this.download.export_type, "VehicleData");
				toastr.success(response.message, response);
			} else {
				toastr.warning(response.message, response);
			}
		}, (error) => {
			toastr.warning("Something is wrong", error);
		});
	}
	}

	

	selectChanged(id, status) {
		this._vehicleService.statusChanged({ "id": id, "status": status }).subscribe(
			(response: any) => {
				if (response.success) {
					toastr.success(response.message, response);
				}
			});
	}
	//#endregion
	submitForm(f) {
		f.form.markAsTouched();
		if (f.valid) {
			this.vehicle.contacts = this.vehicle.contacts.filter(function (element, index) {
				return (element.contact_name != null && element.email != null)
			});
			if (this.vehicle.id > 0 && this.editMode) {
				this.vehicle.deletedcontactidinfo = this.deletedcontactidinfo;
				this._vehicleService.upateVechicle(this.vehicle).subscribe((response) => {
					if (response.success) {
						toastr.success(response.message, response);
						this.vehicle = new vehicleModel();
						this.vehicle.contacts = Array<contactModel>();
						this.showform = false;
						this.showTable = true;
						this.showUpdateButton = true;
					} else {
						toastr.warning(response.message, response);
					}
				}, (error) => {
					toastr.warning("Something is wrong", error);
				});
			}
			else {
				this._vehicleService.addViechicle(this.vehicle).subscribe((response) => {
					if (response.success) {
						//toastr.success(response.message, response);
						this.vehicle = null;
						this.showform = false;
						this.showTable = true;
						this.showUpdateButton = false;
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
		this.editMode = false;
	}
	editVehicle(id: number) {
		this.editMode = true;
		this._vehicleService.getVehicleById(id).subscribe((response) => {
			if (response.success) {
				this.showUpdateButton = true;
				this.vehicle = response.data;
				this.vehicle.business_group_id=response.data.business_group_id;
				this.getBusinessGroups();
				this.getBusinessUnitsList(this.vehicle.business_group_id);
				this.showform = true;
				this.showTable = false;
			}
		});

	}
	createVechicle(isEdit = false) {
		if (!isEdit) {
			this.vehicle = new vehicleModel();
			this.vehicle.contacts = Array<contactModel>();
			this.vehicle.contacts.push(new contactModel());
			this.isdefaultchange(0);
		}
		this.editMode = false;
		this.showform = true;
		this.showTable = false;
		this.showUpdateButton = false;
		this.getBusinessGroups();
	}

	isdefaultchange(index: number) {
		if (this.old != null)
			this.vehicle.contacts[this.old].is_primary = false;
		this.old = index;
		this.vehicle.contacts[index].is_primary = true;

	}
	addContactInfo() {
		this.vehicle.contacts.push(new contactModel());
	}
	deleteContactInfo(e, i) {
		let id = this.vehicle.contacts[i].id;
		let rmobj = this.vehicle.contacts[i];
		this.vehicle.contacts = this.vehicle.contacts.filter(obj => obj !== rmobj);
		if (this.vehicle.contacts.length == 0) {
			this.addContactInfo();
			this.isdefaultchange(0);
		}
		if (id != null)
			this.deletedcontactidinfo.push(id);
	}
	cancel($event) {
		this.vehicle = null;
		this.myfrm.form.markAsUntouched();
		this.showform = false;
		this.showTable = true;
	}
	getYears() {
		this.year = this.date.getFullYear();
		for (let i = 0; i < 50; i++) {
			this.years.push({ "yearText": this.year - i });
		}

	}
	getBusinessGroups() {
		this._vehicleService.getBusinessGroupList().subscribe(
			(response) => {
				this.businessGroup = response.data;
			}
		)
	}
	getBusinessUnitsList(groupid:number) {
		this._vehicleService.getBusinessUnitList(groupid).subscribe((response) => {
			this.businessUnit = response.data;
		})
	}
	resetSearch() {
		this.closepopup();
		this.paging.search = {};
		this.getVehicles(event);
	}

	closepopup() {
		if (this.cd){
			this.cd.closepopupdt();
		}
	}
	getVehicleHistory(id:number, status:number){
		console.log(id);
		console.log(status);
		this.getDriver();
		this.getTrackers();
		this.passStatusId(id);
		 this._vehicleService.getVechicleDriverHistory(id).subscribe(
			(response) => {
				this.showVehicleHistory = true;
				if (response.success) {
					this.showTable = false;
					this.showform = false;
					this.vehicleDriverHistory = response.data;
					this.vehicleDriverHistoryId=response.id;
				}else{
					
				}
			}
		)  
		this._vehicleService.getVechicleTrackerHistory(id).subscribe(
			(response) => {
				if (response.success) {
					this.showTable = false;
					this.showform = false;
					this.vehicleTrackerHistory = response.data;
					this.vehicleTrackerHistoryId=response.id;
				}else{
					//this.trackerHistory ={};
				}
			}
		)  

	}
	cancelTrackerHistory(){
		this.showTable = true;
		this.showVehicleHistory = false;
	}
	toggleVehicleTrackerAssignPopUp(id,status) {
		this.getBusinessGroups();
		this.getUnassignedTrackersList(null,null);
		this.showVehicleTrackerAssignPopUP = true;
		if (this.showVehicleTrackerAssignPopUP){
			this.trackerassignpopupwindow = this.modalService.open(this.trackerassignpopup, {size: 'lg'});
		} else {
			this.trackerassignpopupwindow.close();
		}
	}
	closePopUp(){
		this.trackerHistory=new trackerHistory();
		this.trackerassignpopupwindow.close();
	}

	toggleVehicleDriverAssignPopUp(id,status) {
				this.getBusinessGroups();
				this.getUnassignedDriversList(null,null);
				this.showVehicleDriverAssignPopUP = true;
				if (this.showVehicleDriverAssignPopUP){
					this.driverAssignpopupwindow = this.modalService.open(this.driverassignpopup, {size: 'lg'});
				} else {
					this.driverAssignpopupwindow.close();
				}
	}
	closeDriverAssignPopUp(){
		this.driverHistory=new drivers();
		this.driverAssignpopupwindow.close();
	}
	passStatusId(id:number){
		this._vehicleService.getStatusId(id).subscribe((response)=>{
			this.vehicle=response.data;
		});
	}
	getDriver(){
		this._vehicleService.getDriverService().subscribe((response) => {
			this.drivers = response.data;
		});
	}
	getTrackers(){
		this._vehicleService.getTrackerService().subscribe((response) => {
			this.trackerAssignment = response.data;
		});
	}
	getUnassignedDriversList(business_group_id,business_unit_id){
		this.historyOfDriver={
			business_group_id:business_group_id,
			business_unit_id:business_unit_id
		}
		this._vehicleService.getUnassignedDrivers(this.historyOfDriver).subscribe((response) => {
			if(response.success){
				this.drivers=response.data;
			}
		});
	}
	getUnassignedTrackersList(business_group_id,business_unit_id){
		this.trackerHistory={
			business_group_id:business_group_id,
			business_unit_id:business_unit_id
		}
		this._vehicleService.getUnassignedTrackers(this.trackerHistory).subscribe((response) => {
			if(response.success){
				this.trackerAssignment=response.data;
			}
		});
	}
	getUnassignedDriverById(id:number){
	this._vehicleService.getunAssignedDriverById(id).subscribe((response) => {
			if (response.success) {
				toastr.success(response.message, response);
			} else {
				toastr.warning(response.message, response);
			}
		}, (error) => {
			toastr.warning("Something is wrong", error);
		}); 
		this.cancelTrackerHistory();
	}
	getunAssignedTrackerById(id:number){
		this._vehicleService.getunAssignedTrackerById(id).subscribe((response) => {
			if (response.success) {
				toastr.success(response.message, response);
			} else {
				toastr.warning(response.message, response);
			}
		}, (error) => {
			toastr.warning("Something is wrong", error);
		}); 
		this.cancelTrackerHistory();
	}
	/* getStatus(){
		this._vehicleService.getStatusService().subscribe(
			(response)=>{
				this.Status=response.data;
			}
		)
	} */
	assignDriverToVehicle(id:number) {
		this.historyOfDriver={
			id:this.vehicle.id,
			driver_id:this.driverHistory.id,
			business_group_id:this.driverHistory.business_group_id,
			business_unit_id:this.driverHistory.business_unit_id
		}
		this._vehicleService.assignDriverToVehicle(this.historyOfDriver).subscribe((response) => {
			if (response.success) {
				toastr.success(response.message, response);
				this.vehicle = null;
				this.showform = false;
				this.showTable = true;
				this.showUpdateButton = false;
				//this.getVehicleHistory(this.historyOfDriver.id, this.vehicle.status)
				this.showVehicleHistory=false;
				this.driverAssignpopupwindow.close();
			} else {
				toastr.warning(response.message, response);
			}
		}, (error) => {
			toastr.warning("Something is wrong", error);
		});
		
	}
	assignTrackerToVehicle(id:number){
		this.trackerHistory={
			id:id,
			tracker_id:this.trackerHistory.tracker_id,
			business_group_id:this.trackerHistory.business_group_id,
			business_unit_id:this.trackerHistory.business_unit_id
		}
		this._vehicleService.assignTrackerToVehicle(this.trackerHistory).subscribe((response) => {
			if (response.success) {
				toastr.success(response.message, response);
				this.vehicle = null;
				this.showform = false;
				this.showTable = true;
				this.showUpdateButton = false;
				//this.getVehicleHistory(this.vehicle.id, this.vehicle.status)
				this.showVehicleHistory=false;
				this.trackerassignpopupwindow.close();
			} else {
				toastr.warning(response.message, response);
			}
		}, (error) => {
			toastr.warning("Something is wrong", error);
		});

	}
	
}