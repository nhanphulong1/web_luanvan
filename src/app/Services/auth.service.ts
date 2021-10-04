import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginComponent } from '../user/login/login.component';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  public getLoggedInName = new Subject();
  public permissions = [];
  public type = 0;
  public dangnhap = true;


  constructor(private router: Router, public dialog: MatDialog) {}

  public setToken (token){
    if (!token) {
      this.removeToken();
      return;
    }
    localStorage.setItem('token', token);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.type = decodedToken.result.type;
    // this.permissions = decodedToken.permissions.map((role) => role.toLowerCase());
  }

  public removeToken() {
    localStorage.removeItem('token');
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getInfo(){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.getToken());
    return decodedToken.result.id;
  }

  public isLoggedIn(): boolean {
    const helper = new JwtHelperService();
    var tokenExpired = helper.isTokenExpired(this.getToken())
    if(this.getToken() !== null && tokenExpired == true)
      return false;
    return this.getToken() !== null;
  }

  public canAccess(url) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.getToken());
    this.type = decodedToken.result.type;
    if(url.includes('admin') && this.type == 2){
      return true;
    }
    const page = url.toString().substr(1);
    // // console.log('canAccess', page);
    // if (this.permissions.includes(page)) {
    //   return true;
    // }
    console.error('Bạn không thể vào trang ' + page);
    return false;
  }

  public logout() {
    this.removeToken();
    this.router.navigate(['/home']);
    // this.router.navigateByUrl('/front/header', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/home']);
    // }); 
  }

  public login(backUrl): void {
    this.openDialog(backUrl);
  }

  private openDialog(backUrl): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px',
      data: { email: '', password: '', token: '', status: this.dangnhap },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const email = result?.data?.email;
      const password = result?.data?.password;
      const token = result?.data?.token;
      if(token?.status == 0 && token?.message == "Invalid email or password!"){
        this.dangnhap=false;
        this.login(backUrl);
      }else if (!!email && !!password && !!token) {
        this.dangnhap= true;
        // this.getLoggedInName.emit(true);
        this.setToken(token.token);
        this.getLoggedInName.next();
        this.router.navigateByUrl('/front/header', { skipLocationChange: true }).then(() => {
          this.router.navigate([backUrl]);
        }); 
      }
    });
  }

}