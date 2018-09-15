import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {pagingModel} from '../../mastercomponents/shareddata/entities/pagingModel';
import {DataTableModule} from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { address } from "../../models/address.model";
import { businessUnit } from "../../models/businessunit.model";
import { businessGroup } from "../../models/businessgroup.model";
import { Countries } from "../../superadmin/models/countries.model";
import { VehicleSettingsModel } from "../../models/vehicle_settings.model";
import {SettingsService} from "../../services/settings.service";
import { CountryService } from '../../services/countries.service';
import { VehicleSettingService } from '../../services/vehicle_settings.service';
import { Globals } from '../../globals/global';

declare let toastr;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  //#region Properties

    business :businessGroup =  new businessGroup();
    vehiclesettings :VehicleSettingsModel =  new VehicleSettingsModel();
    distancetypes=[];
    BusinessDate=[];
    countries: Countries[] = []
    showCreateGroup: boolean = false;
    showAddGroupPopUP: boolean = false;
    showUpdateBusiness: boolean = false;
    showAddUnitPopUP: boolean=false;
    showUpdateBusinessUnit: boolean=false;
    createVehicleSettings:boolean=false;
    data=[];
    deletedBusinessUnits  = [];
    @ViewChild('f') myfrm;
    @ViewChild('f1') myfrm1;
    @ViewChild('f2') myfrm2;
    @ViewChild('addbg') addbgmodal;
	  @ViewChild('businessunit') bupopup;
    bupopupwindow: NgbModalRef;
    @ViewChild('businessgroup') bgpopup;
	  bgpopupwindow: NgbModalRef;

  //#endregion

  //#region Constructor

    constructor( private router:Router, private route:ActivatedRoute,
		private modalService: NgbModal,
		private _settingservice: SettingsService,private _vehiclesettingservice: VehicleSettingService,
		private countryService: CountryService,private globals: Globals) { }
      
      ngOnInit() {
        this.getCountries();
        this.getDiatancevalue();
      }

  //#endregion

  //#region Methods

    addBusiness(f: NgForm){
        if(f.valid){
            if (this.business.id > 0) {
              this.business.deletedBusinessUnits=this.deletedBusinessUnits;
              this._settingservice.updateBusinessGroup(this.business).subscribe((response) => {
                if (response.success) {
                  this.showUpdateBusiness=true;
                  toastr.success(response.message, response)
                  this.business =  new businessGroup();
                  this.business.group_address =  new address();
                  this.business.business_units = Array<businessUnit>();
                  //this.togglePopUp();
                  this.getBusinessGroups();
                } else {
                  toastr.warning(response.message, response);
                }
              }, (error) => {
                toastr.warning("Something is wrong", error);
              });
          }else{
            
            this._settingservice.addBusinessGroup(this.business).subscribe((response) => {
              if (response.success) {
                this.showUpdateBusiness=false;
                toastr.success(response.message, response)
                this.business =  new businessGroup();
                this.business.group_address =  new address();
                this.business.business_units = Array<businessUnit>();
               // this.togglePopUp();
                this.getBusinessGroups();
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
    ShowBusinessGroup() {
      
      
        this.getBusinessGroups();
        //this.getCountries();
      
    }
    getBusinessGroups(){
      if(this.globals.getprofileaction.getBusinessGroups==true){
        this.showCreateGroup = !this.showCreateGroup;
        if(this.showCreateGroup){
        this._settingservice.getBusinessGroups().subscribe((response)=>{
          if(response.success){
              this.BusinessDate=response.data;
          }else {
            toastr.warning(response.message, response);
          }
        }, (error) => {
          toastr.warning("Something is wrong", error);
        });
      }
      }
      else{

        this._settingservice.getBusinessGroups().subscribe((response)=>{
          toastr.warning(response.message, response);
        });
      }
      
    }

    getCountries() {
      this.countryService.getCountries().subscribe((response) => {
        this.countries = response.data;
      })
    }
    getDiatancevalue(){
      this._vehiclesettingservice.getDiatance().subscribe((response)=>{
        this.distancetypes = response.data;
        //this.distancetypes = parseInt(this.distancetypes)
      })
    }
    edit_mode:boolean=false;
    editBusiness(id: number) {
      this.edit_mode=true;
      this._settingservice.getBusinessByid(id).subscribe((response) => {
        if (response.success) {
          this.business =response.data;
          this.showUpdateBusiness=true;
          this.showAddGroupPopUP=true;
          this.bgpopupwindow = this.modalService.open(this.bgpopup, {size: 'lg'});
        }else {
          toastr.warning(response.message, response);
        }
      });
    }
    
    businessUnitAdd(f1: NgForm){
          if(f1.valid){
                this._settingservice.addBusinessUnit(this.business).subscribe((response) => {
                  if (response.success) {
                    toastr.success(response.message, response)
                    this.showUpdateBusinessUnit=false;
                    this.business =  new businessGroup();
                    this.business.group_address =  new address();
                    this.business.business_units = Array<businessUnit>();
                   // this.toggleUnitPopUp();
                    this.getBusinessGroups();
                  } else {
                    toastr.warning(response.message, response);
                  }
                }, (error) => {
                  toastr.warning("Something is wrong", error);
                });
            
             }else{
             f1.form.markAsTouched();
             toastr.warning('Please fill all mandatory details.');
            return false;
           }
      }
      
      editBusinessUnit(id: number) {
        this._settingservice.getBusinessUnitByid(id).subscribe((response) => {
          if (response.success) {
            this.business.business_units.push(response.data);
            this.showUpdateBusinessUnit=true;
            this.bupopupwindow = this.modalService.open(this.bupopup, {size: 'lg'});
          }else {
            toastr.warning(response.message, response);
          }
        });
      }

      DeleteBusiness(id: number) {
        this._settingservice.deleteBusinessGroup(id).subscribe((response) => {
          if (response.success) {
            toastr.success(response.message, response);
            this.getBusinessGroups();
          }else {
            toastr.warning(response.message, response);
          }
        });
      }

      DeleteBusinessUnit(id: number) {
        this._settingservice.deleteBusinessUnit(id).subscribe((response) => {
          if (response.success) {
            toastr.success(response.message, response);
            this.getBusinessGroups();
          }else {
            toastr.warning(response.message, response);
          }
        });
      }

      getSettings(){
          this._vehiclesettingservice.getAllSettings().subscribe((response)=>{
            if(response.success){
                this.vehiclesettings=response.data;
                this.vehiclesettings.distance_type=+(this.vehiclesettings.distance_type);
            }else {
              toastr.warning(response.message, response);
            }
          }, (error) => {
            toastr.warning("Something is wrong", error);
          });
      }

      updateVehicleSettings(f2: NgForm){
        if(f2.valid){
          this._vehiclesettingservice.updateSettings(this.vehiclesettings).subscribe((response) => {
                  if (response.success) {
                    toastr.success(response.message, response);
                    this.getSettings();
                  } else {
                    toastr.warning(response.message, response);
                  }
                }, (error) => {
                  toastr.warning("Something is wrong", error);
                });
            
              }else{
                f2.form.markAsTouched();
                toastr.warning('Please fill all mandatory details.');
               return false;
              }
      }

  //#endregion

  //#region Events

  

  addBusinessUnit() {
		this.business.business_units.push(new businessUnit());
	}

	deleteBusinessUnit(e,i) {
    let id = this.business.business_units[i].id;
		let rmobj = this.business.business_units[i];
    this.business.business_units = this.business.business_units.filter(obj => obj !== rmobj);
    if( id != null)
      this.deletedBusinessUnits.push(id)    
  }
  
  togglePopUp() {
    this.showUpdateBusiness= false;
    this.showAddGroupPopUP = !this.showAddGroupPopUP;
    if (this.showAddGroupPopUP){
      this.bgpopupwindow = this.modalService.open(this.bgpopup, {size: 'lg'});
    } else {
      this.business =  new businessGroup();
      this.bgpopupwindow.close();
    }
  }
  
  
  ShowAddBusinessUnit(id:number) {
    this.business.id=id;
    this.showAddUnitPopUP = true;
	  this.bupopupwindow = this.modalService.open(this.bupopup, {size: 'lg'});
    this.addBusinessUnit();
  }

  toggleUnitPopUp() {
    this.showUpdateBusinessUnit=false;
    this.business.business_units = Array<businessUnit>();
    this.showAddUnitPopUP = false;
	  this.bupopupwindow.close();
  }

  ShowVehicleSettings() {
    this.createVehicleSettings = !this.createVehicleSettings;
    if(this.createVehicleSettings){
      this.getSettings();
     // this.getCountries();
    }
  }
  //#endregion


}
