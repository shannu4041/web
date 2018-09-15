import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Location } from "../../models/location.model";
import { pagingModel } from "../../mastercomponents/shareddata/entities/pagingModel";
import { LocationService } from '../../services/location.service';
import {businessUnit} from "../../models/businessunit.model";
import {businessGroup} from "../../models/businessgroup.model";
import { empty } from 'rxjs/observable/empty';
import { DriverService } from "../../services/driver.service";
import { AddlocationComponent } from '../addlocation/addlocation.component';
import { LocationView } from '../../Common/common';
import { Globals } from '../../globals/global';
declare let toastr;

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  
  //#region Properties

    locations : Location[]=[];
    pageData :pagingModel =  new pagingModel();
    LocationData = [];
    bussinessgroup: businessGroup[] = [];
    busssinessunit: businessUnit[] = [];
    busssinessunitlist:businessUnit[] = [];
    totalrecords:number;
    @ViewChild(AddlocationComponent)
    private addLocationComponent: AddlocationComponent;
    public lView = LocationView;
    locationsCount:number = 0;
    @Input() locationView: LocationView = LocationView.BoxView;
    //serchLocationId = 0;
    
	//#endregion

  //#region Constructor

    constructor(private modalService: NgbModal, private _locationservice: LocationService, 
      private _driverservice: DriverService, private globals: Globals) {
        this.pageData.pageSize = 9;
        this.pageData.page = 0;
        this.pageData.sortBy = null;
        this.pageData.sortDirection = null;
       }
    ngOnInit() {
      this.getBussinesslist();
      this.getLocations();
      this.getAllLocations();
      this.getBusinessUnit();
    }

  //#endregion

  //#region Methods 

    
    getAllLocations(){
      this._locationservice.getAllLocations().subscribe((response:any) => {
        this.locations = response.data;
      });
    }

    getBussinesslist() {
      this._driverservice.getBusinessGroupsList().subscribe((response: any) => {
        this.bussinessgroup = response.data;
      });
    }

    getBusinessUnitsList(id) {
      this._driverservice.getBusinessUnitList(id).subscribe((response) => {
        this.busssinessunit = response.data;
      });
    }
    getBusinessUnit(){
      this._locationservice.getBusinessUnit().subscribe((response) => {
        this.busssinessunitlist = response.data;
      });
    }
	
  /*scrchLocation(){
    this._locationservice.locationSearch(this.serchLocationId).subscribe((response) => {

    })
  }*/
  getLocations(lodeMore=false){
        if(lodeMore){
          this.pageData.page = this.pageData.page +1;
         }else{
          this.LocationData =[];
         }
        this._locationservice.getLocationsAll(this.pageData).subscribe((response)=>{
          if(response.success){
            for(let i of response.data ){
              this.LocationData.push(i);
            }
            this.totalrecords=response.totalrecords;
          }else {
            //toastr.warning(response.message, response);
          }
        }, (error) => {
          toastr.warning("Something is wrong", error);
        });
  }
  
    DeleteLocation(id: number) {
      this._locationservice.deleteLocation(id).subscribe((response) => {
        if (response.success) {
          toastr.success(response.message, response);
          this.getLocations();
        }else {
          toastr.warning(response.message, response);
        }
      });
    }
  //#endregion

  //#region Events

    onPopupClose(result: boolean) {
      if (result) {
        this.getLocations();
      }
    }
  
  //#endregion

}

export class pageModel {
  constructor(public pageSize?: number, public page?: number,public business_group_id?: number,
    public business_unit_id?: number,public location_id?: number) { }
}
