import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { CountryService } from '../../services/countries.service';
import { LocationService } from '../../services/location.service';
import { businessUnit } from "../../models/businessunit.model";
import { businessGroup } from "../../models/businessgroup.model";
import { DriverService } from "../../services/driver.service";
import { Countries } from "../../superadmin/models/countries.model";
import { Location } from "../../models/location.model";
import { address } from "../../models/address.model";
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../../globals/global';

declare let toastr;

@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.css']
})
export class AddlocationComponent implements OnInit {
  //#region properties
  location: Location = new Location();
  countries: Countries[] = [];
  bussinessgroup: businessGroup[] = [];
  busssinessunit: businessUnit[] = [];
  showAddPopUP: boolean = false;
  showUpdatelocations: boolean = false;
  showCreatelocations: boolean = false;
  @Output() onClose = new EventEmitter();
  @ViewChild('add') addpopup;
  addpopupwindow: NgbModalRef;
  @ViewChild('f') myfrm;
 //#endregion
  constructor(private modalService: NgbModal, private _locationservice: LocationService, private _driverservice: DriverService,
    private _countryservice: CountryService, private globals: Globals) { }

  ngOnInit() {
    this.getCountries();
    this.getBussinesslist();
  }
   //#region Data Functions
  getCountries() {
    this._countryservice.getCountries().subscribe((response) => {
      this.countries = response.data;
    })
  }

  getBussinesslist() {
    this._driverservice.getBusinessGroupsList().subscribe((response: any) => {
      this.bussinessgroup = response.data;
    })
  }

  getBusinessUnitsList(id) {
    this._driverservice.getBusinessUnitList(id).subscribe((response) => {
      this.busssinessunit = response.data;
    })
  }

  addLocation() {
    //this.myfrm.markAsTouched();
    if (this.location.id > 0) {
      this._locationservice.updateLocation(this.location).subscribe((response) => {
        if (response.success) {
          this.showUpdatelocations = true;
          toastr.success(response.message, response);
          this.location = new Location();
          this.location.address_info = new address();
         // this.togglePopUp();
          this.onClose.emit(true);
        } else {
          toastr.warning(response.message, response);
        }
      }, (error) => {
        toastr.warning("Something is wrong", error);
      });

    } else {

      this._locationservice.addLocation(this.location).subscribe((response) => {
        if (response.success) {
          //this.addpopupwindow.close();
          this.showUpdatelocations = false;
          toastr.success(response.message, response);
          this.location = new Location();
          this.location.address_info = new address();
          //this.togglePopUp();
          this.onClose.emit(true);
        } else {
          toastr.warning(response.message, response);
        }
      }, (error) => {
        toastr.warning("Something is wrong", error);
      });

    }
  }

  editLocation(id: number) {
    this._locationservice.getLocationById(id).subscribe((response) => {
      if (response.success) {
        this.location = response.data;
        this.showUpdatelocations = true;
        this.showCreatelocations = false;
        this.showAddPopUP = true;
        this.addpopupwindow = this.modalService.open(this.addpopup, { size: 'lg' });
      } else {
        toastr.warning(response.message, response);
      }
    });
  }

  togglePopUp() {
  
    this.location=new Location();
    this.showUpdatelocations=false;
    this.showAddPopUP = !this.showAddPopUP;
    if (this.showAddPopUP) {
      this.addpopupwindow = this.modalService.open(this.addpopup, { size: 'lg' });
    } else {
      this.addpopupwindow.close();
    }
  }
//#endregion
}
