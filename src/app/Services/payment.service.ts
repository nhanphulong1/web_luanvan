import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
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

    public getPaymentById(id): Observable<any> {
        const url = this.REST_API_SERVER + 'api/payment/' + id;
        return this.httpClient.get<any>(url)
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


    //Get all course
    public postPayment(data): Observable<any> {
        const url = this.REST_API_SERVER + 'payment';
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

    public createPayment(data): Observable<any> {
        const url = this.REST_API_SERVER + 'api/payment';
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

    public updatePayment(user,data): Observable<any> {
        const url = this.REST_API_SERVER + 'api/payment/'+user;
        return this.httpClient.put<any>(url, data)
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

    public deletePayment(id): Observable<any>{
        const url = this.REST_API_SERVER+'api/payment/'+id;
        return this.httpClient.delete<any>(url)
        .pipe(
          map((data)=>{
            // console.log('data: ',data, this.httpOptions);
            if (Object.prototype.hasOwnProperty.call(data, 'error')) {
              console.log('DataService: getCourse: error', data);
            }
            return data;
          })
        ).pipe(catchError(this.handleError));
      }
}
