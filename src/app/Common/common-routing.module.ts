import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonComponent } from './common.component';
import { AccountListComponent } from './account-list/account-list.component';

const CommonauthRoutes: Routes = [
    {path:'',component:CommonComponent,
    children:[
    {path: '',
    children: [
        { path: 'accountslist', component: AccountListComponent },
       // { path: 'accountslist/:account_name', component: AccountListComponent }
        
    ]
}
]
}
]

@NgModule({
    imports: [
        RouterModule.forChild(CommonauthRoutes),
        NgbModule.forRoot()
    ],
    exports: [RouterModule]
})
export class CommonRoutingModule {

}