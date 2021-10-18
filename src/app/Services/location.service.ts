import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private REST_API_SERVER = 'http://localhost:3000/api/location';

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

    //Get Location by Class id
    public getAllLocation(): Observable<any>{
      const url = this.REST_API_SERVER+'/';
      return this.httpClient.get<any>(url)
      .pipe(
        map((data)=>{
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log('DataService: getLocation: error', data);
          }
          return data;
        })
      ).pipe(catchError(this.handleError));
    }
}
