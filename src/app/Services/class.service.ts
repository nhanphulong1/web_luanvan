import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private REST_API_SERVER = 'http://localhost:3000/api/class';

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


  //Get all Class
  public getAllClass(): Observable<any>{
    const url = this.REST_API_SERVER+'/';
    return this.httpClient.get<any>(url)
    .pipe(
      map((data)=>{
        // console.log('data: ',data, this.httpOptions);
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          console.log('DataService: getClass: error', data);
        }
        return data;
      })
    ).pipe(catchError(this.handleError));
  }

  //Get all Class
  public getAllClassByTeacherNull(): Observable<any>{
    const url = this.REST_API_SERVER+'/teacher/null';
    return this.httpClient.get<any>(url)
    .pipe(
      map((data)=>{
        // console.log('data: ',data, this.httpOptions);
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          console.log('DataService: getClass: error', data);
        }
        return data;
      })
    ).pipe(catchError(this.handleError));
  }

  //Get all Class for teacher
  public getAllClassByTeacher(id): Observable<any>{
    const url = this.REST_API_SERVER+'/teacher/'+id;
    return this.httpClient.get<any>(url)
    .pipe(
      map((data)=>{
        // console.log('data: ',data, this.httpOptions);
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          console.log('DataService: getClass: error', data);
        }
        return data;
      })
    ).pipe(catchError(this.handleError));
  }

    //Get all Class for course
    public getAllClassByCourse(id): Observable<any>{
      const url = this.REST_API_SERVER+'/course/'+id;
      return this.httpClient.get<any>(url)
      .pipe(
        map((data)=>{
          // console.log('data: ',data, this.httpOptions);
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getClass: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }

    //Get Class by id
    public getClassById(id): Observable<any>{
      const url = this.REST_API_SERVER+'/'+id;
      return this.httpClient.get<any>(url)
      .pipe(
        map((data)=>{
          // console.log('data: ',data, this.httpOptions);
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getClass: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }

    //Get Student in class
    public getStudentInClass(id): Observable<any>{
      const url = this.REST_API_SERVER+'/student/'+id;
      return this.httpClient.get<any>(url)
      .pipe(
        map((data)=>{
          // console.log('data: ',data, this.httpOptions);
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getClass: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }

    //check full class
    public checkClassFull(id): Observable<any>{
      const url = this.REST_API_SERVER+'/check/'+id;
      return this.httpClient.get<any>(url)
      .pipe(
        map((data)=>{
          // console.log('data: ',data, this.httpOptions);
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getClass: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }
  
    //search Class
    public searchClass(data): Observable<any>{
      const url = this.REST_API_SERVER+'/search';
      return this.httpClient.post<any>(url,data)
      .pipe(
        map((data)=>{
          // console.log('data: ',data, this.httpOptions);
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getClass: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }
  
    //create Class
    public createClass(data): Observable<any>{
      const url = this.REST_API_SERVER+'/';
      return this.httpClient.post<any>(url,data)
      .pipe(
        map((data)=>{
          // console.log('data: ',data, this.httpOptions);
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getClass: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }
  
    //update user
    public updateClass(id,data): Observable<any>{
      const url = this.REST_API_SERVER+'/'+id;
      return this.httpClient.put<any>(url,data)
      .pipe(
        map((data)=>{
          // console.log('data: ',data, this.httpOptions);
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getClass: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }

    //update status class
    public updateStatus(id,data): Observable<any>{
      const url = this.REST_API_SERVER+'/complete/'+id;
      return this.httpClient.put<any>(url,data)
      .pipe(
        map((data)=>{
          // console.log('data: ',data, this.httpOptions);
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getClass: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }
  
    //delete Class
    public deleteClass(id): Observable<any>{
      const url = this.REST_API_SERVER+'/'+id;
      return this.httpClient.delete<any>(url)
      .pipe(
        map((data)=>{
          // console.log('data: ',data, this.httpOptions);
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getClass: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }
}
