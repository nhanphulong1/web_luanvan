import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MailService {
    private REST_API_SERVER = 'http://localhost:3000/';

    constructor(private httpClient: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        })
    };

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


    //Send mail create student
    public sendMailUser(data): Observable<any> {
        const url = this.REST_API_SERVER + 'mail/create/user';
        return this.httpClient.post<any>(url, data, this.httpOptions)
            .pipe(
                map((data) => {
                    // console.log('data: ',data, this.httpOptions);
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getCourse: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }

    //send mail create teacher
    public sendMailTeacher(data): Observable<any> {
        const url = this.REST_API_SERVER + 'mail/create/teacher';
        return this.httpClient.post<any>(url, data, this.httpOptions)
            .pipe(
                map((data) => {
                    // console.log('data: ',data, this.httpOptions);
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getCourse: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }

    //Send mail teacher Assignment
    public sendMailAssign(data): Observable<any> {
        const url = this.REST_API_SERVER + 'mail/assignment';
        return this.httpClient.post<any>(url, data, this.httpOptions)
            .pipe(
                map((data) => {
                    // console.log('data: ',data, this.httpOptions);
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getCourse: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }

    //Return mail contact
    public sendMailContact(data): Observable<any> {
        const url = this.REST_API_SERVER + 'mail/contact';
        return this.httpClient.post<any>(url, data, this.httpOptions)
            .pipe(
                map((data) => {
                    // console.log('data: ',data, this.httpOptions);
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getCourse: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }
}
