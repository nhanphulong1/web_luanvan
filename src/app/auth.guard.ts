import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // alert(this.authService.canAccess(state.url));
    if(this.authService.isLoggedIn() && this.authService.canAccess(state.url)==1){
      return true;
    } else if(this.authService.canAccess(state.url)==2){
      alert("Bạn không có quyền truy cập!");
      return false;
    }
    else{
      alert("Vui lòng đăng nhập lại!");
      this.router.navigate(['home']);
    }
    return false;
  }
  
}
