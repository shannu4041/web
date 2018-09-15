import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

declare let toastr;
@Component({
    //selector: 'app-singin',
    templateUrl: './master.component.html'
})
export class MasterComponent implements OnInit {
    master: any = {};
    
    data: dropdownList[] = [new dropdownList(1, 'Developer'), new dropdownList(2, 'Tester'), new dropdownList(3, 'Designer')]
    constructor() { }

   
    SubmitForm(f: NgForm) {
    }

    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    ngOnInit(){
        this.master.dropdown = '';
       // toastr.success('Hey Its look awesome!')
        this.dropdownList = [
                              {"id":1,"itemName":"India"},
                              {"id":2,"itemName":"Singapore"},
                              {"id":3,"itemName":"Australia"},
                              {"id":4,"itemName":"Canada"},
                              {"id":5,"itemName":"South Korea"},
                              {"id":6,"itemName":"Germany"},
                              {"id":7,"itemName":"France"},
                              {"id":8,"itemName":"Russia"},
                              {"id":9,"itemName":"Italy"},
                              {"id":10,"itemName":"Sweden"}
                            ];
        this.selectedItems = [
                                {"id":2,"itemName":"Singapore"},
                                {"id":3,"itemName":"Australia"},
                                {"id":4,"itemName":"Canada"},
                                {"id":5,"itemName":"South Korea"}
                            ];
        this.dropdownSettings = { 
                                  singleSelection: false, 
                                  text:"Select Countries",
                                  selectAllText:'Select All',
                                  unSelectAllText:'UnSelect All',
                                  enableSearchFilter: true,
                                  classes:"myclass custom-class"
                                };            
    }
    onItemSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }


}

export class dropdownList {
    constructor(public id: number, public Name: string) { }
}
