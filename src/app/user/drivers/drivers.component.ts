import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import {drivers} from "../../models/drivers.model";
import {Countries} from "../../superadmin/models/countries.model";
import { DriverService } from "../../services/driver.service";
import {AccountService} from "../../services/account.service"
import { CountryService} from "../../services/countries.service";
import { Response } from '@angular/http/src/static_response';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { DataTableModule } from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {businessUnit} from "../../models/businessunit.model";
import {businessGroup} from "../../models/businessgroup.model";
import {vehicleModel, vehicleDriverHistory} from "../../models/vehicle.model";
import { environment } from '../../../environments/environment';
import { DropzoneConfig } from '../../mastercomponents/dropzone/dropzone.interfaces';
import { AppCommonService } from '../../services/appcommon.service';
import { Globals } from '../../globals/global';

declare let toastr;
@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
	//#region Properties
	countries: Countries[]=[];
	bussinessgroup : businessGroup[]=[];
	busssinessunit : businessUnit[]=[];
	UnassignedVehicle : vehicleModel[]=[];
  	paging: pagingModel = new pagingModel();
	totalRecords: number;
	profile_pic_path:string;
  	showDriverTable: boolean = true;
	showCreateDriver: boolean = false;
  	showUpdateDriver: boolean = false;
	gender:string;
	driver:drivers = new drivers();
	driversHistory:vehicleDriverHistory[]=[];
	old: number = null;
	new: number = null;
	driverslist: drivers[]= [];
	download:any;
	url:any;
	showDriverHistory:boolean=false;
	@ViewChild('f') myfrm;
	showfilterPopUP: boolean = false;
	@ViewChild('showsuccesspopup') sspopup;
	ssppopupwindow: NgbModalRef;
	@ViewChild('showfilterpopup') filterpopup;
	filterpopupwindow: NgbModalRef;
	@ViewChild('cd') cd;
	driverName:any;
	config : DropzoneConfig =  new DropzoneConfig();
	licenseValidity = [
		{value: "VALID", name: "VALID"},
		{value: "EXPIRY", name: "EXPIRY"}
	];
	Status = [
		{id: "1", name: "Active"},
		{id: "0", name: "In-Active"}
	];
	//#endregion

 //#region Constructor
	
  constructor(private router: Router, private route: ActivatedRoute, private _driverservice: DriverService, private countryService:CountryService,
	private modalService: NgbModal, private _commonService: AppCommonService,private globals: Globals) { }

  ngOnInit() {
    this.totalRecords = 0;
		this.getCountries();
		this.getBussinesslist();
		this.genderList();
		this.getVehicle();

		this.config.addRemoveLinks = true;
		this.config.url = environment.serviceurl + '/Common/fileuploadtotemp';

	}
	//#endregion
	
	//#region Methods
	
	DOBClick(e){
    //this.person.DOB = "11/29/2017";
		}
	genderList(){
			this._driverservice.genderList().subscribe((response:any) => {
			this.gender = response.data;
		});
	}
	getBussinesslist(){
    	this._driverservice.getBusinessGroupsList().subscribe((response:any) => {
	  this.bussinessgroup = response.data;
    })
	}
	getBusinessUnitsList(id,event){
    this._driverservice.getBusinessUnitList(id).subscribe((response) => {
			this.busssinessunit = response.data;
			if(event){
			this.getAllDriversData(event);
			}
    });
	}
	getVehicle(){
		this._driverservice.getUnassignedVehicle().subscribe((response:any) => {
		this.UnassignedVehicle = response.data;
	})
}
  getCountries(){
    this.countryService.getCountries().subscribe((response) => {
      this.countries = response.data;
    });
  }

  selectDriver(id: number) {
		console.log(id);
	}	
	editDriver(id: number,event) {
		this.getBussinesslist();
		this._driverservice.getDriverById(id).subscribe((response) => {
			if (response.success) {
				this.driver = response.data;
				this.driver.vehicle_id=response.data.vehicle_id;
				this.getBusinessUnitsList(this.driver.business_group_id,event);
				console.log("this.driver");
				this.driver.name = response.data.name;
				this.showUpdateDriver = true;
				this.toggleCreateAccount(true);
			}
		});
	}
	deleteAccount(id: number) {
		console.log(id);
  }
  
  getAllDriversData(event,search=false,refresh=false) {
		this.closepopup();
		if (this.paging == null)
			this.paging = new pagingModel();
		this.paging.pageSize = event.rows;
		this.paging.page = event.first;
		this.paging.sortBy = event.sortField;
		if (event.sortOrder == 1 || refresh==true) {
			this.paging.sortDirection = "desc";
		}
		else {
			this.paging.sortDirection = "asc";
		}
		if(refresh){
			this.paging.search={};
		}
		this._driverservice.getDriversAll(this.paging).subscribe((response) => {
			console.log(response);
			if (response.success) {
				this.driverslist = response.data;
				this.totalRecords = response.totalrecords;
				if(search){
					this.closepopup();
				}
			}
			this.closepopup();
		});
	}
	downloadDriver(sortBy, sortDirection, export_type, search){
		this.download={
			sortBy:sortBy,
			sortDirection:sortDirection,
			export_type:export_type,
			search:search
		}
		if(this.download.export_type=='print'){
			this._driverservice.getDownloadDrivers(this.download).subscribe((response) => {
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
		this._driverservice.getDownloadDrivers(this.download).subscribe((response) => {
			if (response.success) {
				this.url=response.data;
				//window.location.href=this.url;
				//window.open(this.url,"_blank");
				this._commonService.downloadFileFromUrl(this.url, this.download.export_type,"DriversData");
				toastr.success(response.message, response);
			} else {
				toastr.warning(response.message, response);
			}
		}, (error) => {
			toastr.warning("Something is wrong", error);
		});
	}
	}
  submitForm(f: NgForm) {
    //f.form.markAsTouched();
    if (this.myfrm.valid) {
      if (this.driver.id > 0) {
				this._driverservice.updateDriver(this.driver).subscribe((response) => {
			if (response.success) {
            toastr.success(response.message, response)
            this.driver = new drivers();
						this.showCreateDriver = false;
						this.showDriverTable = true;
						this.showUpdateDriver = false;
					} else {
						toastr.warning(response.message, response);
					}
				}, (error) => {
					toastr.warning("Something is wrong", error);
				});
			}
			else {
				this._driverservice.addDriver(this.driver).subscribe((response) => {
					if (response.success) {
						toastr.success(response.message, response)
						this.driver = new drivers();
						this.showCreateDriver = false;
						this.showDriverTable = true
						this.showUpdateDriver = false;
					} else {
						toastr.warning(response.message, response);
					}
				}, (error) => {
					toastr.warning("Something is wrong", error);
				});
			}
    }else{
      f.form.markAsTouched();
			toastr.warning('Please fill all mandatory details.');
			return false;
    }
    
	}
	//#endregion
	//#region Events
	
  buttonClick(id:number) {
		this._driverservice.DriverStatus(id).subscribe((response:any) => {
			if (response.success) {
				toastr.success(response.message, response);
			}else{
				toastr.warning(response.message, response);
			}
		});
		
  }
  
  toggleCreateAccount(isEdit:boolean) {
		if (!isEdit){
		this.driver = new drivers();
		}
		this.showCreateDriver = true;
		this.showDriverTable = false;
  }
  cancelButtonClick(e) {
    this.driver = new drivers();
		this.showCreateDriver = false;
		this.showDriverTable = true;
		this.showUpdateDriver= false;
	}

	// closepopup() {
	// 	this.showfilterPopUP = !this.showfilterPopUP;
	// 	if (this.showfilterPopUP){
	// 	  this.filterpopupwindow = this.modalService.open(this.filterpopup, {size: 'lg'});
	// 	} else {
	// 	  this.filterpopupwindow.close();
	// 	}
	// 	}
		resetSearch(){
			this.paging.search={};
			this.getAllDriversData(event);
			this.closepopup();
		}

		closepopup() {
			if (this.cd){
				this.cd.closepopupdt();
			}
		}
		getDriverHistory(id:number){
			this._driverservice.getDriverHistory(id).subscribe((response:any) => {
				if (response.success) {
					this.driversHistory=response.data;
					this.showDriverHistory=!this.showDriverHistory;
					this.showDriverTable=false;
          this.driverName=this.driversHistory[0].name;
				}else{
					toastr.warning(response.data, response);
				}
			});
		}
		closeDriverHistory(){
			this.showDriverTable = true;
			this.showDriverHistory = false;
		}
	//#endregion
}
