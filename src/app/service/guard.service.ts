import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(
    private loginService: LoginService,
    private _router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let rpta = this.loginService.isLoging();
    if (!rpta) {
      this.loginService.closeSession();
      return false;
    } else {
      const helper = new JwtHelperService();
      let token = sessionStorage.getItem(environment.TOKEN_NAME);}
    return true;
  }
}
