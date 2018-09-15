import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { MasterComponent } from './Master/master.component';
import { UserComponent } from './user.component';
import { profileActionComponet } from "./profileaction/profileaction.component";
import { SettingsComponent } from "./settings/settings.component";
import { VehiclesComponent } from "./vehicles/vehicles.component";
import { DriversComponent } from "./drivers/drivers.component";
import { UserprofileComponent } from "./userprofile/userprofile.component";
import { LocationsComponent } from "./locations/locations.component";
import { ManageusersComponent } from "./manageusers/manageusers.component";
import { TripsComponent } from "./trips/trips.component";
import { TrackersComponent } from "./trackers/trackers.component";
import { MapsComponent } from "./maps/maps.component";

const authRoutes: Routes = [
    {
        path: ':id',
        component: UserComponent,
        children: [
            {
                path: '',
                children: [
                    { path: 'master', component: MasterComponent },
                    { path: '',redirectTo:'dashboard'},
                    { path: 'profileaction', component: profileActionComponet },
                    { path: 'settings', component: SettingsComponent },
                    { path: 'vehicles', component: VehiclesComponent },
                    { path: 'drivers', component: DriversComponent },
                    { path: 'userprofile', component: UserprofileComponent },
                    { path: 'locations', component: LocationsComponent },
                    { path: 'manageusers', component: ManageusersComponent,data : {data : 'admin'} },
                    { path: 'trips', component: TripsComponent },
                    { path: 'trackers', component: TrackersComponent },
                    { path: 'maps', component: MapsComponent },
                    { path: 'dashboard', component: DashboardComponent },
                    
				]
            }
        ]
    }
   
]
@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule {

}
