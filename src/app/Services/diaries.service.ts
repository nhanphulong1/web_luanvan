import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DiariesService {
    private REST_API_SERVER = 'http://localhost:3000/api/diaries';

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

    //Get Diaries by ID
    public getDiariesById(di_id): Observable<any> {
        const url = this.REST_API_SERVER + '/' + di_id;
        return this.httpClient.get<any>(url)
            .pipe(
                map((data) => {
                    // console.log('data: ',data, this.httpOptions);
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getDiaries: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }

    //Get all Diaries
    public getDiariesByClass(cla_id): Observable<any> {
        const url = this.REST_API_SERVER + '/class/' + cla_id;
        return this.httpClient.get<any>(url)
            .pipe(
                map((data) => {
                    // console.log('data: ',data, this.httpOptions);
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getDiaries: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }

    //Get all Diaries
    public getDiariesByTeacher(tea_id): Observable<any> {
        const url = this.REST_API_SERVER + '/teacher/' + tea_id;
        return this.httpClient.get<any>(url)
            .pipe(
                map((data) => {
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getDiaries: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }

    public createDiaries(data): Observable<any> {
        const url = this.REST_API_SERVER + '/';
        return this.httpClient.post<any>(url, data)
            .pipe(
                map((data) => {
                    // console.log('data: ',data, this.httpOptions);
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getDiaries: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }

    public updateStatusNotifi(id,data): Observable<any> {
        const url = this.REST_API_SERVER + '/'+id;
        return this.httpClient.put<any>(url, data)
            .pipe(
                map((data) => {
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getDiaries: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }

    //delete Diaries
    public deleteDiaries(di_id): Observable<any> {
        const url = this.REST_API_SERVER + '/' + di_id;
        return this.httpClient.delete<any>(url)
            .pipe(
                map((data) => {
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        console.log('DataService: getDiaries: error', data);
                    }
                    return data;
                })
            ).pipe(catchError(this.handleError));
    }

}
