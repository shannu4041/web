import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from "@angular/router";
import { Globals } from '../globals/global';
import { Helpers } from '../helpers';

@Component({
    selector: 'app-root',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';
    
  constructor(private route: ActivatedRoute, private globals: Globals, private _router: Router) {
    this.route.params.subscribe((params:any) => {
      globals.account = params.id;
    });
  }

  ngOnInit() {
    console.log('User Component On Init');
		this._router.events.subscribe((route) => {
			if (route instanceof NavigationStart) {
        console.log('User Component Route Start');
				Helpers.setLoading(true);
				Helpers.bodyClass(this.globalBodyClass);
			}
			if (route instanceof NavigationEnd) {
        console.log('User Component Route End');
				Helpers.setLoading(false);
			}
		});
	}
}
