import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { saveAs } from 'file-saver/FileSaver';

@Injectable()
export class AppCommonService {
    constructor(private http: HttpClient) {
    }

    downloadFileFromUrl(fileURL, type, filename) {
        var isFileSaverSupported = false;
        try {
            isFileSaverSupported = !!new Blob;
        } catch (e) { }

        if (isFileSaverSupported) {
            const header = new HttpHeaders();
            header.append('Content-Type', type == 'excel' ? 'application/vnd.ms-excel' : 'application/pdf');
            header.append('Accept', type == 'excel' ? 'application/vnd.ms-excel' : 'application/pdf');

            return this.http.get(fileURL, {
                headers: header,
                responseType: 'blob'
            }).subscribe((res) => {
                this.saveToFileSystem(res, type, filename);
            });
        }
        else {
            window.open(fileURL, "_blank");
        }
    }

    private saveToFileSystem(response, dtype, fname) {
        const filename = fname + (dtype == 'excel' ? '.xls' : '.pdf');
        const blob = new Blob([response], { type: dtype == 'excel' ? 'application/vnd.ms-excel' : 'application/pdf' });
        saveAs(blob, filename);
    }
}

/* Another way Backup

constructor(private http: Http) {
    }

    downloadFileFromUrl(fileURL, type, filename){
        const header = new Headers();
        header.append('Content-Type', 'application/pdf');
        header.append('Accept', 'application/pdf');

        return this.http.get(fileURL, {
            headers: header,
            responseType: ResponseContentType.ArrayBuffer
        }).subscribe((res) => {
            this.saveToFileSystem(res, type, filename);
        });
    }

    private saveToFileSystem(response, dtype, fname) {
        const filename = fname + (dtype == 'excel' ? '.xls' : '.pdf');
        const blob = new Blob([response._body], { type: dtype == 'excel' ? 'application/vnd.ms-excel' : 'application/pdf' });
        saveAs(blob, filename);
    }

*/