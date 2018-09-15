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
import { AccountService } from "../../services/account.service";
import { UserAccountService } from "../../services/useraccount.service";
import { Countries } from "../models/countries.model";
import { accountModel } from "../models/accounts.model";
import { contactModel } from "../models/contact.model";
import { AccountModal } from "../accounts/account.modal";
import { ProbeModal } from "../accounts/account.modal";
import { DirectorsModal } from "../accounts/directors.modal";
import { address } from "../models/address.model";
import {search} from "../../models/search.model";
import { CountryService } from '../../services/countries.service';
import { message } from '../../mastercomponents/form/index';
import { Globals } from '../../globals/global';
import { AppCommonService } from '../../services/appcommon.service';
import { DropzoneConfig } from '../../mastercomponents/dropzone/dropzone.interfaces';
import { environment } from '../../../environments/environment';
import { CGIModal } from "../accounts/account.modal";
import { Result } from '../../superadmin/models/response.model';
import { cgiUser } from "../../models/download_username";

declare let toastr;

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html'
})

export class AccountsComponent {

	//#region Properties
	//countries: Countries[] = []
	//contactaccountModel: object[];
	//deletedcontactidinfo = [];
	paging: pagingModel = new pagingModel();
	totalRecords: number;
	showCGITable: boolean = false;
	showInputDetails: boolean = false;
	showCGIDetails: boolean = false;
	showfilterPopUP: boolean = false;
	person: AccountModal = new AccountModal();
	probe: ProbeModal = new ProbeModal();
	user_cgi:cgiUser[]=[];
	/* old: number = null;
	new: number = null; */
	cgilist: CGIModal[] = [];
	message
	Status = [
		{id:1,name:"Active"},
		{id:0,name:"In Active"}
	];
	download:any;
	url:any;
	@ViewChild('f') myfrm;
	@ViewChild('showsuccesspopup') sspopup;
	ssppopupwindow: NgbModalRef;
	@ViewChild('showfilterpopup') filterpopup;
	filterpopupwindow: NgbModalRef;
	@ViewChild('cd') cd;
	config : DropzoneConfig =  new DropzoneConfig();
	time:any;
	details=[];
	fromdate:any;
	todate:any;
	searchdata:any;
	timer:any
	//#endregion

	//#region Constructor
	constructor(private router: Router, private route: ActivatedRoute, private _accountservice: AccountService, private countryService: CountryService, private modalService: NgbModal
		,private globals: Globals,private _commonService: AppCommonService) {
			//console.log(globals.switchLanguageValue);
	}

	ngOnInit() {
		this.totalRecords = 0;
		//this.getCountries();
		//this.isdefaultchange(0);
		this.config.addRemoveLinks = true;
		this.config.acceptedFiles=".xls,.xlsx";
		//this.config.acceptedFiles=".xlsx";
		this.config.url = environment.serviceurl + '/Common/fileuploadtotemp';
		this.selectCgiUser();
	}
	

	//#endregion

	//#region Methods

	selectCgiUser() {
		this._accountservice.cgiuserdownload().subscribe((response) => {
			this.user_cgi = response.data;
		})
	}


	getCGIDetailsId(id: number) {
		this._accountservice.getCGIDetailsId(id).subscribe((response) => {
			if (response.success) {
				this.details = response.data;
				this.probe = response.probedata;
				this.probe.directors = Array<DirectorsModal>();
				this.probe.directors = response.probedata.directors;
				debugger;
				this.showInputDetails=true;
				//this.showCGITable=false;
				this.showCGIDetails=true;
			}
		});
	}

	searchGrid(event,search=false){
		//this.getAllCGIData(event,true);
		this.showCGITable=true;
	}

	/* getAllCGIData(event,search=false) {
		if (this.paging == null)
			this.paging = new pagingModel();
		this.paging.pageSize = event.rows;
		this.paging.page = event.first;
		if (event.sortOrder == 1 ) {
			this.paging.sortDirection = "desc";
		}
		else {
			this.paging.sortDirection = "asc";
		}
		this._accountservice.getCGIData(this.paging).subscribe((response) => {
			console.log(response);
			debugger;
			if (response.success) {
				this.cgilist = response.data;
				this.totalRecords = response.totalrecords;
				if(search){
					this.showCGITable=true;
				}
			}
		});
	} */
	downloadExcel(sortBy, sortDirection, export_type, search){
		this.download = {
			sortBy: sortBy,
			sortDirection: sortDirection,
			export_type: export_type,
			search: search
		}
		this._accountservice.getexcelExportCGIDetails(this.download).subscribe((response) => {
			debugger;
			if (response.success) {
				this.url=response.data;
				this._commonService.downloadFileFromUrl(this.url, this.download.export_type, "Data Collections");
				toastr.success(response.message, response);
			} else {
				toastr.warning(response.message, response);
			}
		}, (error) => {
			toastr.warning("Something is wrong", error);
		});
	}

	SubmitForm(f: NgForm) {
		f.form.markAsTouched();
		if (f.valid) {this._accountservice.getUploadFile(this.person).subscribe((response) => {
					if (response.success) {
						debugger
						toastr.success(response.message, response)
						this.person = new AccountModal();
						//this.getAllCGIData(event,true);
						this.closepopups();
					} else {
						toastr.warning(response.message, response);
					}
				}, (error) => {
					debugger;
					toastr.warning("Something is wrong", error);
				});
			}
			else {
				f.form.markAsTouched();
				toastr.warning('Please fill all mandatory details.');
				return false;
			}
		}


	//#endregion

	//#region Events

	 closepopups() {
	 	this.showfilterPopUP = !this.showfilterPopUP;
	 	if (this.showfilterPopUP){
	 	  this.filterpopupwindow = this.modalService.open(this.filterpopup, {size: 'lg'});
	 	} else {
	 	  this.filterpopupwindow.close();
	 	  //this.paging.search={};
	 	}
	   }

	   showCGIGirdDetails(event,search:boolean,fromdate:any,todate:any){
		this.showCGIDetails=false;
		this.showCGITable=true;
		this.showInputDetails=false;
	   }
	
	//#endregion
}
