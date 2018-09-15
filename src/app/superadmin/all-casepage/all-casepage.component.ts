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
import { AllCasesService } from "../../services/allcases.services";
import { AllCasesModel } from "../../models/allcases.model";

declare let toastr;

@Component({
  selector: 'app-all-casepage',
  templateUrl: './all-casepage.component.html',
  styleUrls: ['./all-casepage.component.css']
})
export class AllCasepageComponent implements OnInit {

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
  allcases:AllCasesModel[]=[];
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
	constructor(private router: Router, private route: ActivatedRoute, private _allcaseservice: AllCasesService, private countryService: CountryService, private modalService: NgbModal
		,private globals: Globals,private _commonService: AppCommonService) {
			//console.log(globals.switchLanguageValue);
	}

	ngOnInit() {
		this.totalRecords = 0;
	}
	

	//#endregion

	//#region Methods

  closepopup() {
		if (this.cd){
			this.cd.closepopupdt();
		}
  }
  
  resetSearch() {
		this.closepopup();
		this.paging.search = {};
		this.getAllCases(event);
	}

	searchGrid(event,search=false){
		//this.getAllCGIData(event,true);
		this.showCGITable=true;
	}

	getAllCases(event,search=false,refresh = false) {
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
		this._allcaseservice.getAllCases(this.paging).subscribe((response) => {
			console.log(response);
			debugger;
			if (response.success) {
				this.allcases = response.data;
				this.totalRecords = response.totalrecords;
				if(search){
          this.closepopup();
				}
			}
		});
	}

	


	//#endregion
}
