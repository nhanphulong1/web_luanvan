import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private REST_API_SERVER = 'http://localhost:3000/api/student';

  
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


  //Get all Student
  public getAllStudent(): Observable<any>{
    const url = this.REST_API_SERVER+'/';
    return this.httpClient.get<any>(url)
    .pipe(
      map((data)=>{
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          console.log('DataService: getStudent: error', data);
        }
        return data;
      })
    ).pipe(catchError(this.handleError));
  }

  public getCountStudent(): Observable<any>{
    const url = this.REST_API_SERVER+'/count/1';
    return this.httpClient.get<any>(url)
    .pipe(
      map((data)=>{
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          console.log('DataService: getStudent: error', data);
        }
        return data;
      })
    ).pipe(catchError(this.handleError));
  }

  public checkStudent(data): Observable<any>{
    const url = this.REST_API_SERVER+'/check';
    return this.httpClient.post<any>(url,data)
    .pipe(
      map((data)=>{
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          console.log('DataService: getStudent: error', data);
        }
        return data;
      })
    ).pipe(catchError(this.handleError));
  }

  //Get Student by id
  public getStudentById(id): Observable<any>{
    const url = this.REST_API_SERVER+'/'+id;
    return this.httpClient.get<any>(url)
    .pipe(
      map((data)=>{
        // console.log('data: ',data, this.httpOptions);
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          console.log('DataService: getStudent: error', data);
        }
        return data;
      })
    ).pipe(catchError(this.handleError));
  }

  //search Student
  public searchStudent(data): Observable<any>{
    const url = this.REST_API_SERVER+'/search';
    return this.httpClient.post<any>(url,data)
    .pipe(
      map((data)=>{
        // console.log('data: ',data, this.httpOptions);
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          console.log('DataService: getStudent: error', data);
        }
        return data;
      })
    ).pipe(catchError(this.handleError));
  }

  //create Student
  public createStudent(data): Observable<any>{
    const url = this.REST_API_SERVER+'/';
    return this.httpClient.post<any>(url,data)
    .pipe(
      map((data)=>{
        // console.log('data: ',data, this.httpOptions);
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          console.log('DataService: getStudent: error', data);
        }
        return data;
      })
    ).pipe(catchError(this.handleError));
  }

  //update user
  public updateStudent(id,data): Observable<any>{
    const url = this.REST_API_SERVER+'/'+id;
    return this.httpClient.put<any>(url,data)
    .pipe(
      map((data)=>{
        // console.log('data: ',data, this.httpOptions);
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          console.log('DataService: getStudent: error', data);
        }
        return data;
      })
    ).pipe(catchError(this.handleError));
  }

  //delete Student
  public deleteStudent(id): Observable<any>{
    const url = this.REST_API_SERVER+'/'+id;
    return this.httpClient.delete<any>(url)
    .pipe(
      map((data)=>{
        // console.log('data: ',data, this.httpOptions);
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          console.log('DataService: getStudent: error', data);
        }
        return data;
      })
    ).pipe(catchError(this.handleError));
  }
}
