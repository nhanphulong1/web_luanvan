import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ResultService {
    private REST_API_SERVER = 'http://localhost:3000/api/result';

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

    //Get Result by Class id
    public getResultById(id): Observable<any> {
        const url = this.REST_API_SERVER + '/'+id;
        return this.httpClient.get<any>(url)
            .pipe(
                map((data) => {
                    // console.log('data: ',data, this.httpOptions);
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getResult: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }


    public createResult(data): Observable<any> {
        const url = this.REST_API_SERVER + '/';
        return this.httpClient.post<any>(url,data)
            .pipe(
                map((data) => {
                    // console.log('data: ',data, this.httpOptions);
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getResult: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }

    public updateResult(id,data): Observable<any> {
        const url = this.REST_API_SERVER + '/'+id;
        return this.httpClient.put<any>(url,data)
            .pipe(
                map((data) => {
                    // console.log('data: ',data, this.httpOptions);
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getResult: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }
}
