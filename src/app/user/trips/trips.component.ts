import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { DataTableModule } from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';
import { TripsService } from '../../services/trips.service';
//import { User } from '../../superadmin/models/user.model';
import { Result } from '../../superadmin/models/response.model';
import { Trips } from "../../models/trips.model";
import { Globals } from '../../globals/global';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit {

  paging: pagingModel;
  trip: Trips[] = [];
  totalRecords: number = 0;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _tripsService: TripsService,private globals: Globals) { }

  ngOnInit() {
  }

  getAllTrips(event) {
    if (this.paging == null)
        this.paging = new pagingModel();
    this.paging.pageSize = event.rows;
    this.paging.page = event.first;
    this.paging.sortBy = event.sortField;
    if (event.sortOrder == 1) {
        this.paging.sortDirection = "desc";
    }
    else {
        this.paging.sortDirection = "asc";
    }
    this._tripsService.getTripsAll(this.paging).subscribe((response: Result) => {
        this.trip = response.data;
        this.totalRecords = response.totalrecords;
    });
}

}
