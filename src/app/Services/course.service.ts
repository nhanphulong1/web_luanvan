import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

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


  //Get all course
  public getAllCourse(): Observable<any>{
    const url = this.REST_API_SERVER+'/course';
    return this.httpClient.get<any>(url)
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

    //Get all course
    public checkClassbyCourse(id): Observable<any>{
      const url = this.REST_API_SERVER+'/course/check_class/'+id;
      return this.httpClient.get<any>(url)
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

  //Get all course
  public getStatistic(): Observable<any>{
    const url = this.REST_API_SERVER+'/course/statistic';
    return this.httpClient.get<any>(url)
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

  public getStatistic1(data): Observable<any>{
    const url = this.REST_API_SERVER+'/course/statistic1';
    return this.httpClient.post<any>(url,data)
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

  public getStatisticTeacher(data): Observable<any>{
    const url = this.REST_API_SERVER+'/course/statistic/teacher';
    return this.httpClient.post<any>(url,data)
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

  public getStatistic2(data): Observable<any>{
    const url = this.REST_API_SERVER+'/course/statistic2';
    return this.httpClient.post<any>(url,data)
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

  public getStatistic3(data): Observable<any>{
    const url = this.REST_API_SERVER+'/course/statistic3';
    return this.httpClient.post<any>(url,data)
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

  public getStatisticByResult(): Observable<any>{
    const url = this.REST_API_SERVER+'/course/statistic/result';
    return this.httpClient.get<any>(url)
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

  public getStatisticByCountStudent(): Observable<any>{
    const url = this.REST_API_SERVER+'/course/statistic/countStudent';
    return this.httpClient.get<any>(url)
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

  public getStatisticByCourse(id): Observable<any>{
    const url = this.REST_API_SERVER+'/course/statistic/course/'+id;
    return this.httpClient.get<any>(url)
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

  public getStatisticResultbyCourse(id): Observable<any>{
    const url = this.REST_API_SERVER+'/course/statistic/result/'+id;
    return this.httpClient.get<any>(url)
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

  //Get course by id
  public getCourseById(id): Observable<any>{
    const url = this.REST_API_SERVER+'/course/'+id;
    return this.httpClient.get<any>(url)
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

   //Get course by name
   public getCourseByName(name): Observable<any>{
    const url = this.REST_API_SERVER+'/course/name/'+name;
    return this.httpClient.get<any>(url)
    .pipe(
      map((data)=>{
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          console.log('DataService: getCourse: error', data);
        }
        return data;
      })
    ).pipe(catchError(this.handleError));
  }


  //create course
  public createCourse(data): Observable<any>{
    const url = this.REST_API_SERVER+'/course';
    return this.httpClient.post<any>(url, data)
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

  //update course
  public updateCourse(id,data): Observable<any>{
    const url = this.REST_API_SERVER+'/course/'+id;
    return this.httpClient.put<any>(url, data)
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

  //delete course
  public deleteCourse(id): Observable<any>{
    const url = this.REST_API_SERVER+'/course/'+id;
    return this.httpClient.delete<any>(url)
    .pipe(
      map((data)=>{
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          console.log('DataService: getCourses: error', data);
        }
        return data;
      })
    ).pipe(catchError(this.handleError));
  }

}
