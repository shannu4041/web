import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterControlPageComponent } from './master-control-page/master-control-page.component';
import { MasterWidgetsComponent } from './master-widgets-page/masterwidgets.component';
import { MasterComponent } from './master.component';
import {UsersComponent} from './users/users.component';

const masterAuthRoutes: Routes = [
    {
        path: '',
        component: MasterComponent,
		children: [
            {
                path: '',
                children: [
                    { path: 'controls', component: MasterControlPageComponent },
					{ path: 'widgets', component: MasterWidgetsComponent },
					{path: 'users', component: UsersComponent}
				]
            }
        ]
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(masterAuthRoutes)
    ],
    exports: [RouterModule]
})
export class MasterControlsRoutingModule {

}
