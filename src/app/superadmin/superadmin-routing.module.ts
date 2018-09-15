import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuperAdminComponent } from './superadmin.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AddQueueComponent } from './add-queue/add-queue.component';
import { AllCasepageComponent } from './all-casepage/all-casepage.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { SettingsComponent} from './settings/settings.component';
//import { UsersComponent } from './users/users.component';
/* import { LanguagesComponent } from './languages/languages.component';
import { MasterusersComponent } from './users/masterusers.component';
import { TrackersComponent } from "./trackers/trackers.component";
import { SettingsComponent } from "./settings/settings.component";
import { TechnicalSettingsComponent } from "./technical-settings/technical-settings.component";
import { ManagemenusComponent } from "./managemenus/managemenus.component"; */

const superAdminauthRoutes: Routes = [
    {path:'',component:SuperAdminComponent,
    children:[
    {path: '',
    children: [
        { path: 'excelupload', component: AccountsComponent },
	 	{ path: 'add_queue', component: AddQueueComponent },
        { path: 'all_casepage', component: AllCasepageComponent },
        { path: 'manage_users', component: ManageUsersComponent },
        { path: 'permissions', component: PermissionsComponent },
		{ path: 'settings', component:SettingsComponent }
       /* { path: 'settings', component: SettingsComponent ,children:[
            { path: 'languages', component: LanguagesComponent },
            { path: 'technicalsettings', component: TechnicalSettingsComponent },
        ]},
        { path: 'managemenus', component: ManagemenusComponent }, */
        
    ]
}
]
}
]

@NgModule({
    imports: [
        RouterModule.forChild(superAdminauthRoutes),
        NgbModule.forRoot()
    ],
    exports: [RouterModule]
})
export class SuperAdminRoutingModule {

}