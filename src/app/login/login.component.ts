import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  type: string="password";
  isText: boolean=false;
  eyeIcon: string="fa-eye-slash";
  LoginPage:boolean=true;
  SignUpPage:boolean=false;

  hideShowPassword(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText?this.type="text":this.type="password";
  }

  login(){
    this.LoginPage=false;
    this.SignUpPage=true;
  }
  signUp(){
    this.SignUpPage=false;
    this.LoginPage=true;
  }
}
