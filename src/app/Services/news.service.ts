import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private REST_API_SERVER = 'http://localhost:3000/api/news';

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

  //Get News by ID
  public getNewsById(n_id): Observable<any> {
      const url = this.REST_API_SERVER + '/' + n_id;
      return this.httpClient.get<any>(url)
          .pipe(
              map((data) => {
                  // console.log('data: ',data, this.httpOptions);
                  if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                      console.log('DataService: getNews: error', data);
                  }
                  return data;
              })
          ).pipe(catchError(this.handleError));
  }

  //Get all News
  public getAllNews(): Observable<any> {
    const url = this.REST_API_SERVER + '/';
    return this.httpClient.get<any>(url)
        .pipe(
            map((data) => {
                // console.log('data: ',data, this.httpOptions);
                if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                    console.log('DataService: getNews: error', data);
                }
                return data;
            })
        ).pipe(catchError(this.handleError));
  }

  //get count page News
  public getCountPageNews(title): Observable<any> {
    const url = this.REST_API_SERVER + '/count/'+title;
    return this.httpClient.get<any>(url)
        .pipe(
            map((data) => {
                // console.log('data: ',data, this.httpOptions);
                if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                    console.log('DataService: getNews: error', data);
                }
                return data;
            })
        ).pipe(catchError(this.handleError));
  }

  //Get search by title
  public searchNews(n_title,number): Observable<any> {
    const url = this.REST_API_SERVER + '/search/'+n_title+'/'+number;
    return this.httpClient.get<any>(url)
        .pipe(
            map((data) => {
                // console.log('data: ',data, this.httpOptions);
                if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                    console.log('DataService: getNews: error', data);
                }
                return data;
            })
        ).pipe(catchError(this.handleError));
  }

  public createNews(data): Observable<any> {
      const url = this.REST_API_SERVER + '/';
      return this.httpClient.post<any>(url, data)
          .pipe(
              map((data) => {
                  // console.log('data: ',data, this.httpOptions);
                  if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                      console.log('DataService: getNews: error', data);
                  }
                  return data;
              })
          ).pipe(catchError(this.handleError));
  }

  public updateNews(id,data): Observable<any> {
      const url = this.REST_API_SERVER + '/'+id;
      return this.httpClient.put<any>(url, data)
          .pipe(
              map((data) => {
                  if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                      console.log('DataService: getNews: error', data);
                  }
                  return data;
              })
          ).pipe(catchError(this.handleError));
  }

  //delete News
  public deleteNews(n_id): Observable<any> {
      const url = this.REST_API_SERVER + '/' + n_id;
      return this.httpClient.delete<any>(url)
          .pipe(
              map((data) => {
                  if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                      console.log('DataService: getNews: error', data);
                  }
                  return data;
              })
          ).pipe(catchError(this.handleError));
  }
}
