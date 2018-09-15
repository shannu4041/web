import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { DataTableModule } from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { AccountListService } from '../../services/accountlist.service';
import { AccountListModel } from '../../models/accountlist.model'

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  paging: pagingModel = new pagingModel();
  totalRecords: number = 0;
  accountlist: AccountListModel[] = [];
   // accounilisturl:any = http://localhost:4200/admin/;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private _accountListService: AccountListService,) { }

  ngOnInit() {
  }
    length:any;
  getAllAccountList = function(event) {
    if (this.paging == null)
        this.paging = new pagingModel();
    this.paging.pageSize = event.rows;
    this.paging.page = event.first;
    this.paging.sortBy = event.sortField;
    if (event.sortOrder == 1) {
        this.paging.sortDirection = "asc";
    }
    else {
        this.paging.sortDirection = "desc";
    }
    this._accountListService.getUserAccounts(this.paging).subscribe((response) => {
        this.accountlist = response.data;
        this.length=response.data.length;
        this.totalRecords = response.totalrecords;
        if(this.length==1){
            this.router.navigate(['/admin/'+this.accountlist[0].account_encrypt_id]);
        }
        else{
            this.router.navigate(['/common/accountslist'])
        }
    });
}

selectId(id:number){
   console.log(id);
   this.router.navigateByUrl('/admin/account_name');
   console.log(this.route);
}

}
