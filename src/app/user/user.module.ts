import { DashboardComponent } from './Dashboard/dashboard.component';
import { MasterComponent } from './Master/master.component';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserRoutingModule } from './user.routing.module';
import { CommonModule} from '@angular/common';
import { HeaderComponent } from './layout/nav.header.component';
import { MenuComponent } from './layout/nav.menu.component';
import { SharedModule } from '../mastercomponents/ngbcomponents/common/shared';
import { DataTableModule } from '../mastercomponents/ngbcomponents/datatable/datatable';
import { NgbTypeaheadConfig } from '../mastercomponents/ngbcomponents/typeahead/typeahead-config';
import { profileActionComponet } from './profileaction/profileaction.component';
import { MasterControlsModule } from '../mastercomponents/master-controls.module';
import { SettingsComponent } from "./settings/settings.component";
import { VehiclesComponent } from "./vehicles/vehicles.component";
import { DriversComponent } from "./drivers/drivers.component";
import { UserprofileComponent } from "./userprofile/userprofile.component";
import { LocationsComponent } from "./locations/locations.component";
import { ManageusersComponent } from "./manageusers/manageusers.component";
import { TripsComponent } from "./trips/trips.component";
import { TrackersComponent } from "./trackers/trackers.component";
import { MapsComponent } from "./maps/maps.component";
import { AddlocationComponent } from "./addlocation/addlocation.component";
import { MyInfoWindow } from './maps/myInfoWindow';


import { NguiMapModule} from '@ngui/map';
@NgModule({
    declarations: [
        MasterComponent,
        DashboardComponent,
        UserComponent,
        HeaderComponent,
        MenuComponent,
        profileActionComponet,
        VehiclesComponent,
        SettingsComponent,
        DriversComponent,
        UserprofileComponent,
        LocationsComponent,
        ManageusersComponent,
        TripsComponent,
        TrackersComponent,
      MapsComponent,
      AddlocationComponent,
      MyInfoWindow
      
    ],
    imports: [
        FormsModule,
        UserRoutingModule,
        NgbModule.forRoot(),
        CommonModule,
        MasterControlsModule,
        DataTableModule,
        SharedModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?libraries=visualization,places,drawing&key=AIzaSyBdUmQev-C9BJCwDzgvL8wn00tNeKxKwVQ'})
    ],
    exports:[
    ],
    providers: [NgbTypeaheadConfig]
})
export class UserModule {

}
