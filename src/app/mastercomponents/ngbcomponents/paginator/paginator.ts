import {NgModule,Component,ElementRef,Input,Output,SimpleChange,EventEmitter,TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from '../dropdown/dropdown';
import {SelectItem} from '../common/selectitem';
import {SharedModule} from '../common/shared';

@Component({
    selector: 'p-paginator',
    template: `<div class="pagination-container">
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-paginator ui-widget ui-widget-header ui-unselectable-text ui-helper-clearfix'"
            *ngIf="alwaysShow ? true : (pageLinks && pageLinks.length > 1)">
			
            <div class="ui-paginator-left-content" *ngIf="templateLeft">
                <p-templateLoader [template]="templateLeft"></p-templateLoader>
            </div>

			<ul class="m-datatable__pager-nav">
			
			   <li>
               <span class="ui-paginator-pages"> 
               <a href="#" class="ui-paginator-first ui-paginator-element ui-state-default ui-corner-all"
						(click)="changePageToFirst($event)" [ngClass]="{'ui-state-disabled':isFirstPage()}" [tabindex]="isFirstPage() ? -1 : null">
					<span class="la la-angle-double-left"></span>
                </a>
                </span>
				</li>
				
				
                <li>
                <span class="ui-paginator-pages">
					<a href="#" class="ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all"
							(click)="changePageToPrev($event)" [ngClass]="{'ui-state-disabled':isFirstPage()}" [tabindex]="isFirstPage() ? -1 : null">
						<span class="la la-angle-left"></span>
                    </a>
                    </span>
				</li>	
		        <li> 		
					<span class="ui-paginator-pages">
						<a href="#" *ngFor="let pageLink of pageLinks" class="ui-paginator-page ui-paginator-element ui-state-default ui-corner-all"
							(click)="onPageLinkClick($event, pageLink - 1)" [ngClass]="{'ui-state-active': (pageLink-1 == getPage())}">{{pageLink}}</a>
					</span>
				</li>
                <li> 	
                <span class="ui-paginator-pages">			
					<a href="#" class="ui-paginator-next ui-paginator-element ui-state-default ui-corner-all"
							(click)="changePageToNext($event)" [ngClass]="{'ui-state-disabled':isLastPage()}" [tabindex]="isLastPage() ? -1 : null">
						<span class="la la-angle-right"></span>
                    </a>
                    </span>
				</li>	
			    
                <li>
                <span class="ui-paginator-pages">
					<a href="#" class="ui-paginator-last ui-paginator-element ui-state-default ui-corner-all"
							(click)="changePageToLast($event)" [ngClass]="{'ui-state-disabled':isLastPage()}" [tabindex]="isLastPage() ? -1 : null">
						<span class="la la-angle-double-right"></span>
                    </a>
                </span>
				</li>
			</ul>
            </div>

    
           <div class="m-datatable__pager-info">
            <p-dropdown class="pagelength" [options]="rowsPerPageItems"  [(ngModel)]="rows" *ngIf="rowsPerPageOptions" 
                (onChange)="onRppChange($event)" [lazy]="false" [autoWidth]="false"></p-dropdown>
            <div class="ui-paginator-right-content" *ngIf="templateRight">
                <p-templateLoader [template]="templateRight"></p-templateLoader>
            </div>
            <div class="recordcount">Displaying  {{getPage() * this._rows + 1}} - {{((getPage()+1) * this._rows) < this._totalRecords? ((getPage()+1) * this._rows) : this._totalRecords }} of {{this._totalRecords}}</div>
		  </div>
    `
})
export class Paginator {

    @Input() pageLinkSize: number = 5;

    @Output() onPageChange: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;

    @Input() alwaysShow: boolean = true;
    
    @Input() templateLeft: TemplateRef<any>;
    
    @Input() templateRight: TemplateRef<any>;

    pageLinks: number[];

    _totalRecords: number = 0;

    _first: number = 0;

    _rows: number = 0;
    
    _rowsPerPageOptions: number[];
    
    rowsPerPageItems: SelectItem[];

    @Input() get totalRecords(): number {
        return this._totalRecords;
    }

    set totalRecords(val:number) {
        this._totalRecords = val;
        this.updatePageLinks();
    }

    @Input() get first(): number {
        return this._first;
    }

    set first(val:number) {
        this._first = val;
        this.updatePageLinks();
    }

    @Input() get rows(): number {
        return this._rows;
    }

    set rows(val:number) {
        this._rows = val;
        this.updatePageLinks();
    }
    
    @Input() get rowsPerPageOptions(): number[] {
        return this._rowsPerPageOptions;
    }

    set rowsPerPageOptions(val:number[]) {
        this._rowsPerPageOptions = val;
        if(this._rowsPerPageOptions) {
            this.rowsPerPageItems = [];
            for(let opt of this._rowsPerPageOptions) {
                this.rowsPerPageItems.push({label: String(opt), value: opt});
            }
        }
    }

    isFirstPage() {
        return this.getPage() === 0;
    }

    isLastPage() {
        return this.getPage() === this.getPageCount() - 1;
    }

    getPageCount() {
        return Math.ceil(this.totalRecords/this.rows)||1;
    }

    calculatePageLinkBoundaries() {
        let numberOfPages = this.getPageCount(),
        visiblePages = Math.min(this.pageLinkSize, numberOfPages);

        //calculate range, keep current in middle if necessary
        let start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))),
        end = Math.min(numberOfPages - 1, start + visiblePages - 1);

        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);

        return [start, end];
    }

    updatePageLinks() {
        this.pageLinks = [];
        let boundaries = this.calculatePageLinkBoundaries(),
        start = boundaries[0],
        end = boundaries[1];

        for(let i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
    }

    changePage(p :number) {
        var pc = this.getPageCount();

        if(p >= 0 && p < pc) {
            this.first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();

            this.onPageChange.emit(state);
        }
    }

    getPage(): number {
        return Math.floor(this.first / this.rows);
    }

    changePageToFirst(event) {
      if(!this.isFirstPage()){
          this.changePage(0);
      }

      event.preventDefault();
    }

    changePageToPrev(event) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    }

    changePageToNext(event) {
        this.changePage(this.getPage()  + 1);
        event.preventDefault();
    }

    changePageToLast(event) {
      if(!this.isLastPage()){
          this.changePage(this.getPageCount() - 1);
      }

      event.preventDefault();
    }

    onPageLinkClick(event, page) {
        this.changePage(page);
        event.preventDefault();
    }

    onRppChange(event) {
        this.changePage(this.getPage());
    }
}

@NgModule({
    imports: [CommonModule,DropdownModule,FormsModule,SharedModule],
    exports: [Paginator,DropdownModule,FormsModule,SharedModule],
    declarations: [Paginator]
})
export class PaginatorModule { }
