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
import { TechnicalSettingsModel } from "../../models/technical-setting.model";
import { TechnicalSettingService } from "../../services/technical-setting.service";
import { DropzoneConfig } from '../../mastercomponents/dropzone/dropzone.interfaces';
import { environment } from '../../../environments/environment';
import { Globals } from '../../globals/global';

declare let toastr;

@Component({
  selector: 'app-technical-settings',
  templateUrl: './technical-settings.component.html',
  styleUrls: ['./technical-settings.component.css'],
})
export class TechnicalSettingsComponent implements OnInit {

  technialSettings :TechnicalSettingsModel = new TechnicalSettingsModel();
  @ViewChild('f') myfrm;
  config : DropzoneConfig =  new DropzoneConfig();
  constructor(private router: Router, private route: ActivatedRoute,
               private _technicalsettingsservice: TechnicalSettingService,
               private globals: Globals) {  }

  ngOnInit() {
    this.getAllTecnicalSettings();
    this.config.acceptedFiles = ".pem";
    this.config.addRemoveLinks = true;
    this.config.url = environment.serviceurl + '/Common/fileuploadtotemp';
  }

  getAllTecnicalSettings() {
    this._technicalsettingsservice.getAllSettings().subscribe((response) => {
      if (response.success) {
        this.technialSettings=response.data;
      }else {
        toastr.warning(response.message, response);
      }
    });
  }

  submitForm(f: NgForm){
      if(this.myfrm.valid){
            this._technicalsettingsservice.updateSettings(this.technialSettings).subscribe((response) => {
              if (response.success) {
                toastr.success(response.message, response)
              } else {
                toastr.warning(response.message, response);
              }
            }, (error) => {
              toastr.warning("Something is wrong", error);
            });
       
        }else{
         this.myfrm.form.markAsTouched();
         toastr.warning('Please fill all mandatory details.');
       return false;
       }
  }

  cancelButtonClick(e){
    this.router.navigate(['../'],{relativeTo:this.route});
  }


}
