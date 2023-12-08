import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { Usuario } from 'src/app/model/usuario';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      id: new FormControl(""),
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
    this.isLoging();
  }

  login() {
    let usuario = new Usuario();
    usuario.username = this.form.value["username"];
    usuario.password = this.form.value["password"];

    this._loginService.login(usuario.username, usuario.password).subscribe(data => {
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);
      this._router.navigate(['product']);
    }, error  =>{
      if (error.status = 400){
        this._snackBar.open("Usuario o Contraseña Invalidos", "❌", {
          duration: 2000,
          });
      }
    });
  }

  isLoging() {
    if (this._loginService.isLoging()) {
      this._router.navigate(["dashBoard"])
    }
  }

}
