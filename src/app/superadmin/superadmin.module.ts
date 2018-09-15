import {NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SuperAdminRoutingModule} from './superadmin-routing.module';
import {SuperAdminComponent} from './superadmin.component';
import {HeaderComponent} from './layout/nav.header.component';
import {MenuComponent} from './layout/nav.menu.component';
import { SharedModule } from '../mastercomponents/ngbcomponents/common/shared';
import { DataTableModule } from '../mastercomponents/ngbcomponents/datatable/datatable';
import { GridService } from '../services/grid.service';
import { NgbTypeaheadConfig } from '../mastercomponents/ngbcomponents/typeahead/typeahead-config';
//import {UsersComponent} from './users/users.component'
import { AccountsComponent } from './accounts/accounts.component';
import {MasterControlsModule} from '../mastercomponents/master-controls.module';

//import { AppTextboxComponent } from '../mastercomponents/app-textbox/app-textbox.component';
//import { AppButtonComponent } from '../mastercomponents/app-button/app-button.component';
//import { ValidationComponent } from '../mastercomponents/validators';
import { NguiMapModule} from '@ngui/map';
/* import { LanguagesComponent } from './languages/languages.component';
import { MasterusersComponent } from './users/masterusers.component';
import { TrackersComponent } from "./trackers/trackers.component";
import { TechnicalSettingsComponent } from "./technical-settings/technical-settings.component";
import { ManagemenusComponent } from "./managemenus/managemenus.component"; */
import { AddQueueComponent } from '../superadmin/add-queue/add-queue.component';
import { AllCasepageComponent } from "../superadmin/all-casepage/all-casepage.component";
import { ManageUsersComponent } from "../superadmin/manage-users/manage-users.component";
import { PermissionsComponent } from "../superadmin/permissions/permissions.component";
import { Helper } from "./helper";
import { SettingsNewComponent } from './settings-new/settings-new.component';


@NgModule({
    declarations: [
        SuperAdminComponent,
        HeaderComponent,
        MenuComponent,
       // UsersComponent,
        AccountsComponent,
        /* LanguagesComponent,
        MasterusersComponent,
        TrackersComponent,
        SettingsComponent,
        TechnicalSettingsComponent,
        ManagemenusComponent, */
		//AppTextboxComponent,
		//AppButtonComponent,
        //ValidationComponent
        AddQueueComponent,
        AllCasepageComponent,
        ManageUsersComponent,
        PermissionsComponent,
        SettingsNewComponent,
        
    ],
    imports: [
        FormsModule,
        CommonModule,
        NgbModule.forRoot(),
        SuperAdminRoutingModule,
        DataTableModule,
        SharedModule,
        MasterControlsModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBdUmQev-C9BJCwDzgvL8wn00tNeKxKwVQ'})
        
    ],
    exports:[],
    providers:[GridService,NgbTypeaheadConfig,Helper]

})

export class SuperAdminModule {
    
    }