import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  type: string="password";
  isText: boolean=false;
  eyeIcon: string="fa-eye-slash";
  LoginPage:boolean=true;
  SignUpPage:boolean=false;
  loginForm !:FormGroup;
  LoginangRegistration:boolean=true;
  signUpForm !: FormGroup;
  constructor(private fb:FormBuilder){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });

    this.signUpForm = this.fb.group({
      companyname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      password: ['', Validators.required],
      newpassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

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
    location.reload();
  }

  onLoginClick(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
    }
    else{
      this.validateAllFormFields(this.loginForm);
      alert("Your Form is Inavlid")
    }

  }

  onSignUpClick(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value);
    }
    else{
      this.validateAllFormFields(this.signUpForm);
    }

  }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control=formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }

    })
  }

  onlyNumbers(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const newPasswordControl = formGroup.get('newpassword');
  
    if (passwordControl && newPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = newPasswordControl.value;
  
      if (password !== confirmPassword) {
        newPasswordControl.setErrors({ mismatch: true });
      } else {
        newPasswordControl.setErrors(null);
      }
    }
  }
  
}
