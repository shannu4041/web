import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../authentication/auth.service';
import { DashboardService } from '../../services/dashboard_service';

declare let toastr;
@Component({
    selector: 'app-user-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    Drivers = {};
    dashBoardData:any[]=[];
    constructor(public auth: CommonService, private dashBoardService: DashboardService) { }

    ngOnInit() {
        this.auth.isLoggedIn;
        this.getDashBoardData();
    }
    getDashBoardData(){
        this.dashBoardService.getDashboardData().subscribe((response:any)=>{
            if(response.success){
            this.dashBoardData=response.data;
            }
        });
    }
	
}
