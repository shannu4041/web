import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from '../../globals/global';

declare let mLayout: any;
@Component({
    selector: 'nav-menu',
    templateUrl: './nav.menu.html',
    //styleUrls: ['./signin.component.css']
})
export class MenuComponent implements OnInit {
    constructor(private globals: Globals) { }

    ngOnInit() {
    }

    ngAfterViewInit() {

        mLayout.initAside();
        let menu = (<any>$('#m_aside_left')).mMenu(); let item = $(menu).find('a[href="' + window.location.pathname + '"]').parent('.m-menu__item'); (<any>$(menu).data('menu')).setActiveItem(item);
    }
}
