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

import { LanguageService } from "../../services/language.service";
import { UserAccountService } from "../../services/useraccount.service";
import { CountryService } from '../../services/countries.service';


import {search} from "../../models/search.model";
import {languageModel,languageValueModel} from "../../models/language.model";
import { Globals } from '../../globals/global';

declare let toastr;

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})




export class LanguagesComponent implements OnInit {
  //#region Properties
  objectKeys = Object.keys;
    languages = [];
    languagedata = new languageModel();
    showLanguageGrid: boolean = true;
    showfilterPopUP: boolean = false;
    showCreateButton: boolean = true;
    paging: pagingModel = new pagingModel();
    totalRecords: number;
    languagelist = [];
    menus=[];
    @ViewChild('showfilterpopup') filterpopup;
    filterpopupwindow: NgbModalRef;
    @ViewChild('f') myfrm;
  //#endregion
  //#region Constructor
    constructor( private _languageservice: LanguageService, private modalService: NgbModal,
      private globals: Globals) { }

    ngOnInit() {
      this.getLanguageCodes();
      this.getMenus();
    }

  //#endregion

  //#region Methods

    getLanguageData(event,search=false,refresh=false) {
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
        this._languageservice.getLanguages(this.paging).subscribe((response) => {
          console.log(response);
          if (response.success) {
            this.languagelist = response.data;
            this.totalRecords = response.totalrecords;
            if(search){
              this.togglePopUp();
            }
          }
        });
      }

    getLanguageCodes() {
        this._languageservice.getLanguageCodes().subscribe((response) => {
          if(response.success){
            this.languages = response.data;
          }
        })
    }

    getLanguageValues() {
      this._languageservice.getLanguageValues().subscribe((response) => {
        if(response.success){
          this.languagedata = response.data;
        }
      })
    }

    submitForm(f: NgForm) {
      if(this.languagedata.id>0){
        this._languageservice.updateLanguageValue(this.languagedata).subscribe((response) => {
          if (response.success) {
            toastr.success(response.message, response)
            this.toggleCreateLanguage();
          } else {
            toastr.warning(response.message, response);
          }
        }, (error) => {
          toastr.warning("Something is wrong", error);
        });
      }else{
        this._languageservice.addLanguageValue(this.languagedata).subscribe((response) => {
          if (response.success) {
            toastr.success(response.message, response)
            this.toggleCreateLanguage();
          } else {
            toastr.warning(response.message, response);
          }
        }, (error) => {
          toastr.warning("Something is wrong", error);
        });
      }
    }

    editLanguage(id: number) {
      this._languageservice.getLanguageKeybyid(id).subscribe((response) => {
        if (response.success) {
          this.languagedata=response.data;
          this.languagedata.lang_words=response.data.lang_words;
          if(this.languagedata.lang_words.length==0){
           this.generatelanguagemodel();
          }
          this.showCreateButton= false;
          this.showLanguageGrid=false;
        }
      });
    }

    getMenus() {
      this._languageservice.getMenuNames().subscribe((response) => {
        if(response.success){
          this.menus = response.data;
        }
      })
    }


  //#endregion

  //#region Events

    toggleCreateLanguage(){
      this.showLanguageGrid=!this.showLanguageGrid;
      if(this.showLanguageGrid){
        this.showCreateButton=true;
      }else{
        this.generatelanguagemodel();
      }
    }
    generatelanguagemodel()
    {
        this.languagedata = new languageModel();
        this.languagedata.lang_key= "";
        for (let i of this.languages) {
          let a = new languageValueModel();
          a.language_name = i.language_name;
          a.language_id = i.id;
          this.languagedata.lang_words.push(a);
        }
     
     }

    togglePopUp() {
        this.showfilterPopUP = !this.showfilterPopUP;
        if (this.showfilterPopUP){
          this.filterpopupwindow = this.modalService.open(this.filterpopup, {size: 'lg'});
        } else {
          this.filterpopupwindow.close();
        }
    }

    resetSearch() {
      this.paging.search={};
      this.getLanguageData(event);
      this.togglePopUp();
      }

  //#endregion

}
