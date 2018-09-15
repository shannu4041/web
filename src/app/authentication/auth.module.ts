import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPassword } from "./forgotpassword/forgotpassword.component";
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.routing.module';
import { CommonService } from './auth.service';
import { Globals } from '../globals/global';

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent,
        AuthComponent,
        ForgotPassword
    ],
    imports: [
        FormsModule,
        AuthRoutingModule
    ],
})
export class AuthModule {
  constructor(private globals: Globals) {
    globals.account = '';
  }
}
