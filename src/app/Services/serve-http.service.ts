import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ServeHttpService {

  private REST_API_SERVER = 'http://localhost:3000/api';



  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
  };

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) : Observable<any>{
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

  //User
    //Get all user
    public getAllUser(): Observable<any>{
      const url = this.REST_API_SERVER+'/user';
      return this.httpClient.get<any>(url)
      .pipe(
        map((data)=>{
          // console.log('data: ',data, this.httpOptions);
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getUsers: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }

    //get user by id
    public getUserById(id): Observable<any>{
      const url = this.REST_API_SERVER+'/user/'+id;
      return this.httpClient.get<any>(url)
      .pipe(
        map((data)=>{
          // console.log('data: ',data, this.httpOptions);
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getUsers: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }

    //search user
    public searchUser(data): Observable<any>{
      const url = this.REST_API_SERVER+'/user/search';
      return this.httpClient.post<any>(url,data)
      .pipe(
        map((data)=>{
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getUsers: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }

    //search user
    public checkEmail(email){
      const url = this.REST_API_SERVER+'/user/email/'+email;
      return this.httpClient.get<any>(url);
    }

    //create user
    public createUser(data): Observable<any>{
      const url = this.REST_API_SERVER+'/user';
      return this.httpClient.post<any>(url,data)
      .pipe(
        map((data)=>{
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getUsers: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }

    //create user
    public updateUser(id,data): Observable<any>{
      const url = this.REST_API_SERVER+'/user/'+id;
      return this.httpClient.put<any>(url,data)
      .pipe(
        map((data)=>{
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getUsers: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }

    //reset user
    public resetPassUser(id): Observable<any>{
      const url = this.REST_API_SERVER+'/user/reset/'+id;
      return this.httpClient.get<any>(url)
      .pipe(
        map((data)=>{
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getUsers: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }

    //delete user
    public deleteUser(id): Observable<any>{
      const url = this.REST_API_SERVER+'/user/'+id;
      return this.httpClient.delete<any>(url)
      .pipe(
        map((data)=>{
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getUsers: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }


  //Register
  public postRegis(data): Observable<any>{
    const url = this.REST_API_SERVER+'/regis';
    return this.httpClient
    .post<any>(url, data)
    .pipe(
      map((data)=>{
        // console.log('data: ',data, this.httpOptions);
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          console.log('DataService: getUsers: error', data);
        }
        return data;
      })
    )
    .pipe(catchError(this.handleError));
  }


  //Contact
  public postContact(data): Observable<any>{
    const url = this.REST_API_SERVER+'/contact';
    return this.httpClient
    .post<any>(url, data ,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

}