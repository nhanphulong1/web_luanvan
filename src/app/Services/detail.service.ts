import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DetailService {

    private REST_API_SERVER = 'http://localhost:3000/api/detail';

    constructor(private httpClient: HttpClient) { }

    private handleError(error: HttpErrorResponse): Observable<any> {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }

    //check detail by id
    public getDeatilById(id): Observable<any> {
        const url = this.REST_API_SERVER + '/' + id;
        return this.httpClient.get<any>(url)
            .pipe(
                map((data) => {
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getDetail: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }

    //check detail valid
    public checkDetail(id): Observable<any> {
        const url = this.REST_API_SERVER + '/check/' + id;
        return this.httpClient.get<any>(url)
            .pipe(
                map((data) => {
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getDetail: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }

    //create detail
    public createDetail(data): Observable<any> {
        const url = this.REST_API_SERVER + '/';
        return this.httpClient.post<any>(url, data)
            .pipe(
                map((data) => {
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getDetail: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }

        //create detail
        public updateDetail(id,data): Observable<any> {
            const url = this.REST_API_SERVER + '/'+id;
            return this.httpClient.put<any>(url, data)
                .pipe(
                    map((data) => {
                        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                            console.log('DataService: getDetail: error', data);
                        }
                        return data;
                    })
                ).pipe(catchError(this.handleError));
        }

    //check detail valid
    public deleteDetail(id): Observable<any> {
        const url = this.REST_API_SERVER + '/' + id;
        return this.httpClient.delete<any>(url)
            .pipe(
                map((data) => {
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getDetail: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }
}
