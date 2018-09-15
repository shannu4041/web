import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { Globals } from './globals/global';
import { Helpers } from './helpers';

declare let toastr;

@Injectable()
export class CustomHttpHandler implements HttpInterceptor {
  public pendingRequests: number = 0;
  public showLoading: boolean = false;

  constructor(private router: Router, private globals: Globals) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //You can add any header for every request here.
    // const customReq = request.clone({
    //     headers: request.headers.set('appl', 'it')
    //   });

    request = request.clone({
      withCredentials: true,
      setHeaders: {
        account: this.globals.account
      }
    });

    this.turnOnLoading();

    return next.handle(request).catch(response => {
      this.turnOffLoading();
      if (response instanceof HttpErrorResponse) {
        if (response.status == 350) {
          //login
          this.router.navigate(['/']);
        }
        else if (response.status == 401) {
          toastr.warning("You are unauthorized to view this page");
          return;
        }
        else if (response.status == 500) {
          toastr.warning("Something went wrong at server.");
          return;
        }
        else if (response.status == 352) {
          toastr.warning(response.statusText);
          return;
        }
        console.log('Processing http error', response);
      }

      return Observable.throw(response);
    }).do((ev: HttpEvent<any>) => {
      if (ev instanceof HttpResponse) {
        // console.log('processing response', ev);
        this.turnOffLoading();
      }
    });
  }

  private turnOnLoading() {
    this.pendingRequests++;
    if (!this.showLoading) {
      this.showLoading = true;
      Helpers.setLoading(true);
      console.log("Turned On Loading Indicator");
    }
  }

  private turnOffLoading() {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      if (this.showLoading) {
        //setTimeout(() => {
          Helpers.setLoading(false);
        //}, 1000);
        console.log("Turned off Loading Indicator");
      }
      this.showLoading = false;
    }
  }
}
