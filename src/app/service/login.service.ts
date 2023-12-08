import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.HOST}/oauth/token`

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  login(user: string, password: string) {
    const body = `grant_type=password&username=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}`;

    return this._http.post<any>(this.url, body, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });
  }

  isLoging() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }

  closeSession() {
    sessionStorage.clear();
    this._router.navigate(['login']);
  }
}
