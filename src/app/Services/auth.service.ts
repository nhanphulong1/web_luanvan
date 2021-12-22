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
import { PermissionService } from './permission.service';
import { ClassService } from './class.service';
import { ServeHttpService } from './serve-http.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public getLoggedInName = new Subject();
    public permissions = [];
    public type = 0;
    public dangnhap = 1;


    constructor(
        private classService: ClassService,
        private service: ServeHttpService,
        private router: Router,
        public dialog: MatDialog,
        private permission: PermissionService
    ) { }

    public setToken(token) {
        if (!token) {
            this.removeToken();
            return;
        }
        localStorage.setItem('token', token);
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        this.type = decodedToken.result.type;
    }

    public removeToken() {
        localStorage.removeItem('token');
    }

    public getToken() {
        return localStorage.getItem('token');
    }

    public getInfo() {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.getToken());
        return decodedToken.result.user;
    }

    public getType(){
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.getToken());
        return decodedToken.result.type;
    }

    public getPermission() {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.getToken());
        this.permissions = decodedToken.result.permission;
        return this.permissions;
    }

    public isLoggedIn(): boolean {
        const helper = new JwtHelperService();
        var tokenExpired = helper.isTokenExpired(this.getToken())
        if (this.getToken() !== null && tokenExpired == true)
            return false;
        return this.getToken() !== null;
    }

    public canAccess(url) {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.getToken());
        this.getPermission();
        this.type = decodedToken.result.type;
        if(this.type == 2){
            return 1;
        }
        if (url.includes('admin') && this.type == 1) {
            if(url.includes('admin/trangchu'))
                return 1;
            if(url.includes('admin/user') && this.permissions.includes(1))
                return 1;
            if(url.includes('admin/course') && this.permissions.includes(2))
                return 1;
            if(url.includes('admin/student') && this.permissions.includes(3))
                return 1;
            if(url.includes('admin/class') && this.permissions.includes(4))
                return 1;
            if(url.includes('admin/teacher') && this.permissions.includes(5))
                return 1;
            if(url.includes('admin/assignment') && this.permissions.includes(6))
                return 1;
            if(url.includes('admin/contact') && this.permissions.includes(7))
                return 1;
            // if(url.includes('admin/statistic') && this.permissions.includes(8))
            //     return 1;
            if(url.includes('admin/tea_statis') && this.type == 1)
                return 1;
            if(url.includes('admin/exam') && this.permissions.includes(9))
                return 1;
            if(url.includes('admin/news') && this.permissions.includes(10))
                return 1;    
            return 2;
        }
        const page = url.toString().substr(1);
        console.error('Bạn không thể vào trang ' + page);
        return 0;
    }

    public logout() {
        this.removeToken();
        this.getLoggedInName.next();
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
            data: { user: '', password: '', token: '', status: this.dangnhap },
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            const user = result?.data?.user;
            const password = result?.data?.password;
            const token = result?.data?.token;
            if (token?.status == 0) {
                this.dangnhap = 0;
                this.login(backUrl);
            } else if(token?.status == 2){
                this.dangnhap = 2;
                this.login(backUrl);
            }else if (!!user && !!password && !!token) {
                this.dangnhap = 1;
                this.setToken(token.token);
                this.permission.getPermissionByUser(this.getInfo()).subscribe((kq)=>{
                    kq.data.forEach(element => {
                        this.permissions.push(element.per_id);
                    });
                });
                this.getLoggedInName.next();
                this.type = this.getType();
                if(this.type != 0){
                    this.router.navigate(['front/class/manage']);
                }else{
                    this.service.getUserById(this.getInfo()).subscribe((result)=>{
                        this.classService.getAllClassByStudent(result.data[0].stu_id).subscribe(kq => {
                            let classData = kq.data[0];
                            this.router.navigate(['front/class/'+classData.cla_id]);
                          });
                      });
                }
            }
        });
    }

}