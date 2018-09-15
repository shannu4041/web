import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPassword } from "./forgotpassword/forgotpassword.component";
import {AuthComponent} from './auth.component'

const authRoutes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                children: [
                    { path: 'signup', component: SignupComponent },    
                    { path: 'forgotpassword', component: ForgotPassword },
                    { path: '', component: SigninComponent }
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
export class AuthRoutingModule {

}
