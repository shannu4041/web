import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { HttpModule } from '@angular/http';
import { AuthModule } from './authentication/auth.module';
import { AppComponent } from './app.component';
import {CustomHttpHandler} from './http.Interceptor';
import {HTTP_INTERCEPTORS,HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomFormsModule } from 'ng2-validation'
import { FormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './error.handler';
import { CommonService } from './authentication/auth.service';
import { AccountService } from "./services/account.service";
import {LogginCheckGuard} from './logincheck'
import { NouisliderModule } from 'ng2-nouislider';
import {UserAccountService} from './services/useraccount.service';
import { CountryService } from "./services/countries.service";
 /*import { SettingsService } from "./services/settings.service";
import { VehicleService } from "./services/vehicle.service";
import { DriverService } from "./services/driver.service";*/
import { ProfileActionService } from "./services/profileaction.service";
/*import { UserProfileService } from './services/userprofile.service';
import { LocationService } from "./services/location.service"; */
import { LanguageService } from "./services/language.service";
/* import { TrackerService } from "./services/tracker.service"; */
import { Globals } from './globals/global';
/* import { TripsService } from "./services/trips.service";
import { AccountListService } from "./services/accountlist.service";
import { MyFormDirective } from './globals/myform'
import { TechnicalSettingService } from "./services/technical-setting.service"; */
import { AppCommonService } from './services/appcommon.service';
/* import { MapService } from "./services/map.service";
import { VehicleSettingService } from "./services/vehicle_settings.service";
import { ManageUsersService } from "./services/managemenus.service";
import { DashboardService } from './services/dashboard_service'; */
import { AppHelper } from "./apphelper";
import { AddqueueService } from "./services/addqueue.service";
import { AllCasesService } from "./services/allcases.services";



@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
		FormsModule,
		CustomFormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AuthModule,
        HttpModule,
        BrowserAnimationsModule,
		NouisliderModule
        
    ],
    providers: [AppCommonService,CommonService,LogginCheckGuard,AccountService,CountryService, LanguageService,
        UserAccountService,
        Globals,AppHelper,ProfileActionService,AddqueueService,AllCasesService,
        {provide:HTTP_INTERCEPTORS,useClass:CustomHttpHandler,multi:true},
        {provide:ErrorHandler,useClass:GlobalErrorHandler}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
