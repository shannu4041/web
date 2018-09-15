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
import { AddqueueService } from "../../services/addqueue.service";
import { Countries } from "../models/countries.model";
import {search} from "../../models/search.model";
import { CountryService } from '../../services/countries.service';
import { message } from '../../mastercomponents/form/index';
import { Globals } from '../../globals/global';
import { AppCommonService } from '../../services/appcommon.service';
import { DropzoneConfig } from '../../mastercomponents/dropzone/dropzone.interfaces';
import { environment } from '../../../environments/environment';
import { Result } from '../../superadmin/models/response.model';
import { AccountService } from "../../services/account.service";
import { AddQueue } from "../../models/addqueue.model";
import { ProbeModal } from "../accounts/account.modal";
import { DirectorsModal } from "../accounts/directors.modal";
import { TruecallerModal } from "../accounts/account.modal";
import { GoogleModal } from "../accounts/account.modal";
import { NaukriModal } from "../accounts/account.modal";
import { CompaniesModal } from "../add-queue/companies.model";
import { ProbedataModal } from "../accounts/account.modal";
import { InputDetails } from "../accounts/account.modal";

declare let toastr;

@Component({
  selector: 'app-add-queue',
  templateUrl: './add-queue.component.html',
  styleUrls: ['./add-queue.component.css']
})
export class AddQueueComponent implements OnInit {
//#region Properties
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
	//person: AccountModal = new AccountModal();
	probe: ProbedataModal = new ProbedataModal();
	truecaller: TruecallerModal = new TruecallerModal();
	google:GoogleModal = new GoogleModal();
	naukri:NaukriModal = new NaukriModal();
	//user_cgi:cgiUser[]=[];
	old: number = null;
	new: number = null;
	queuegrid: any;
	message
	Status = [
		{id:1,name:"Active"},
		{id:0,name:"In Active"}
	];
	download:any;
	url:string;
	@ViewChild('f') myfrm;
	/* @ViewChild('showsuccesspopup') sspopup;
	ssppopupwindow: NgbModalRef;
	@ViewChild('showfilterpopup') filterpopup;
	filterpopupwindow: NgbModalRef; */
	@ViewChild('cd') cd;
	//config : DropzoneConfig =  new DropzoneConfig();
	time:any;
	details=[];
	statusUpadate:InputDetails = new InputDetails();
	fromdate:any;
	todate:any; 
	searchdata:any;
	timer:any
	mycases:any
	allcases:any
	//#endregion

	//#region Constructor
	constructor(private router: Router, private route: ActivatedRoute, private _accountservice: AccountService,private _addqueueservice: AddqueueService, private countryService: CountryService, private modalService: NgbModal
		,private globals: Globals,private _commonService: AppCommonService) {
			this.paging.search.searchoption=true;
	}

	ngOnInit() {
		this.totalRecords = 0;
		
		
	}
	

	//#endregion

	//#region Methods

	getAllQueue(event,search=false,refresh = false) {
		this.closepopup();
		if (this.paging == null)
			this.paging = new pagingModel();	
		this.paging.pageSize = event.rows;
		this.paging.page = event.first;
		this.paging.sortBy = event.sortField;
		if(this.paging.search.searchoption == true){
			if (event.sortOrder == 1 ) {
				this.paging.sortDirection = "desc";
				debugger;
			}
			else {
				this.paging.sortDirection = "asc";
			}
		}
		else if(this.paging.search.searchoption == false){
			debugger;
			if (event.sortOrder == 0 ) {
				this.paging.sortDirection = "asc";
				debugger;
			}
			else {
				this.paging.sortDirection = "asc";
			}
		}
		/* if(this.paging.search.searchoption == false){
			if (event.sortOrder == 1 ) {
				this.paging.sortDirection = "desc";
			}
			else {
				this.paging.sortDirection = "desc";
			}
		} */
	
	if (refresh) {
		this.paging.search = {};
	 }
		this._addqueueservice.getAllQueue(this.paging).subscribe((response) => {
			//console.log(response);
			debugger;
			if (response.success) {
				this.queuegrid = response.data;
				this.totalRecords = response.totalrecords;
				if(search){
					this.closepopup();
			 }
			}
		});
	}

	resetSearch() {
		this.closepopup();
		//this.paging.search = {};
		
		//this.paging.search.searchoption == false;
		this.paging.search = {
			searchoption : true
		};
		this.getAllQueue(event);
	}

	closepopup() {
		if (this.cd){
			this.cd.closepopupdt();
		}
  }
id:number;
	getCGIDetailsId(id: number) {
		this.id=id;
		//console.log(id);
		this._addqueueservice.getCGIDetailsId(id).subscribe((response) => {
			debugger
			if (response.success) {
				this.details = response.data;
				this.statusUpadate = response.data;
				this.probe = response.probedata;
				this.probe.companies = Array<CompaniesModal>();
				this.probe.companies = response.probedata.companies;
				this.truecaller = response.truecallerdata;
				this.google = response.googledata;
				this.naukri = response.naukridata;
				this.showInputDetails=true;
				this.showCGIDetails=true;
				//this.url = this.google[1].google_search_output;
				//console.log("google url--"+this.url);
			}
		});
	}
	//id:number;
	updateCGIStatus(id:number){
		this._addqueueservice.updateCGIStatus(id).subscribe((response) =>{
			if(response.success){
				debugger;	
				this.showCGIGirdDetails(event);
				//this.getAllQueue(event);
				toastr.success(response.message, response);
			}
			else{
				toastr.warning("Status Was Not Update");
			}
		});
	}

	showCGIGirdDetails(event){
		this.showCGIDetails=false;
		//this.showCGITable=true;
		this.showInputDetails=false;
	   }


	//#endregion

	//#region Events
	
	//#endregion
}
