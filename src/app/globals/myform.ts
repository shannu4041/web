import { Directive, OnInit, Input, Renderer, Optional, ElementRef, ViewChild, HostListener } from "@angular/core";
import { NgForm, FormGroupDirective } from "@angular/forms";

@Directive({
    selector: '[myForm]'
  })
  export class MyFormDirective implements OnInit{
  
    @Input() dupa: string;
    @ViewChild('f') public myFrm: NgForm;
  
    constructor(private el: ElementRef,
                private renderer: Renderer) {
    }

    @HostListener('ngSubmit') onSubmit(f) {
        this.renderer.setElementClass(this.el.nativeElement, 'ng-submitted', true);
    }
  
    ngOnInit(){
      /*this.form.ngSubmit.subscribe((args)=>{
        console.log('>>>>>>> new event',args)
        });
  
        this.form.onSubmit = function () {
            console.log('St Validate ngsubmit',this.ngSubmit);
        //this.ngSubmit.fn(null);
        this.ngSubmit.emit(null);
  
        console.log("validate onSubmit()",this.form);
        console.log("Dupa",this.dupa);
        return false;
      };*/
    }
  
  }