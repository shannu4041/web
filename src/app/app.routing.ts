
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LogginCheckGuard} from './logincheck';

const appRoutes: Routes = [
    { path: '', loadChildren: './authentication/auth.module#AuthModule' },
    { path:'admin', loadChildren:'./superadmin/superadmin.module#SuperAdminModule' },
    /* { path:'admin', loadChildren: './user/user.module#UserModule'},
    { path: 'master', loadChildren:'./mastercomponents/master-controls.module#MasterControlsModule' },
    { path: 'common', loadChildren:'./Common/common.module#CommonnModule' } */
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
