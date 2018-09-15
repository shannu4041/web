import {NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CommonRoutingModule} from './common-routing.module';
import {CommonComponent} from './common.component';
import {HeaderComponent} from './layout/nav.header.component';
import {MenuComponent} from './layout/nav.menu.component';
import { SharedModule } from '../mastercomponents/ngbcomponents/common/shared';
import { DataTableModule } from '../mastercomponents/ngbcomponents/datatable/datatable';
import { GridService } from '../services/grid.service';
import { NgbTypeaheadConfig } from '../mastercomponents/ngbcomponents/typeahead/typeahead-config';
import {AccountListComponent} from './account-list/account-list.component'
import {MasterControlsModule} from '../mastercomponents/master-controls.module';
//import { AccountListService } from "../services/accountlist.service";
import { NguiMapModule} from '@ngui/map';

@NgModule({
    declarations: [
        CommonComponent,
        HeaderComponent,
        MenuComponent,
        AccountListComponent
       
    ],
    imports: [
        FormsModule,
        CommonModule,
        NgbModule.forRoot(),
        CommonRoutingModule,
        DataTableModule,
        SharedModule,
        MasterControlsModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBdUmQev-C9BJCwDzgvL8wn00tNeKxKwVQ'})
        
    ],
    exports:[],
    providers:[GridService,NgbTypeaheadConfig]

})

export class CommonnModule {
    
    }