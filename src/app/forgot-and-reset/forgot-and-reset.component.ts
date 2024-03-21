import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotAndResetService } from './forgot-and-reset.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-and-reset',
  templateUrl: './forgot-and-reset.component.html',
  styleUrls: ['./forgot-and-reset.component.css']
})
export class ForgotAndResetComponent implements OnInit{
 ForgotPassword:boolean=true;
 VerifyOTP:boolean=false;
 ResetPassword:boolean=false;


 forgotForm !:FormGroup;
 encryptedData!:string;


 otp:any;
 otp1:string='';
 otp2:string='';
 otp3:string='';
 otp4:string='';
 iserror:boolean=false;

type: string="password";
isText: boolean=false;
eyeIcon: string="fa-eye-slash";
resetForm!:FormGroup;

constructor(private forgotResetService:ForgotAndResetService,
            private fb:FormBuilder,
            private router:Router){}
  ngOnInit(): void {

    this.forgotForm = this.fb.group({
      emailorphone:['',Validators.required],
    });

    this.resetForm=this.fb.group({
      password: ['', Validators.required],
      newpassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  hideShowPassword(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText?this.type="text":this.type="password";
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
  
  inputboxClick(event: any) {
    
  }

// forgot section

onforgotpassword(){
  const formValue = this.forgotForm.value;
 console.log(formValue);
 
  let forgotData: any = {};

  if (formValue.emailorphone.includes('@')) {
    forgotData.t6_email = formValue.emailorphone;
  } else {
    forgotData.t6_mobile_no = formValue.emailorphone;
  }
  if(forgotData!=null){
    this.forgotResetService.forgotPassword(forgotData).subscribe({
      next: (res) => {
        if(res.status=200){
          this.encryptedData=res.data.encrypted_data;
          console.log(this.encryptedData);    
          this.ForgotPassword=false;
          this.VerifyOTP=true;
        }
       
      },
      error: (error) => {
        console.log(error);
        
      }
    });
  }

}


// OTP section

 onOtpInput(event: any, firstInput?: HTMLInputElement): void {
  const input = event.target;

  if (input.value.length === 1 && firstInput) {
    firstInput.focus();
  } else if (!firstInput && input.value.length === 1) {
    // this.validate();
  }
  else {
    console.log("error");
  }
  if (event.key === "Backspace" && event.target.previousElementSibling) {
    const previous = event.target.previousElementSibling as HTMLInputElement;
    // this.iserror = false;
    if (previous) {
      previous.focus();
    }
  }
}

onVerifyOTP(){
  this.otp = `${this.otp1}${this.otp2}${this.otp3}${this.otp4}`;
  let OTPVerificationData: any = {
    encrypted_data: this.encryptedData,
    otp_pin: this.otp
  };
  if(OTPVerificationData!=null){
    this.forgotResetService.OtpVerification(OTPVerificationData).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status=200){
          this.encryptedData=res.data.encrypted_data;
          this.ForgotPassword=false;
          this.VerifyOTP=false;
          this.ResetPassword=true;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}


// Reset Password

resetPassword(){
  const formValue = this.resetForm.value;
  let resetData: any={
    t6_login_pin:formValue.password,
    encrypted_data:this.encryptedData
  }

if(resetData!=null){
 this.forgotResetService.resetPassword(resetData).subscribe({
  next:(res)=>{
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Pin reset Successfully!",
      showConfirmButton: false,
      timer: 3000
    });
    console.log(res);
    this.router.navigate(['/login']);
    window.location.reload();
    this .ForgotPassword=false;
    this.ResetPassword=false;
    this.VerifyOTP=false;
  },
  error:(error)=>{
    console.log(error);
  }
 })
}
}

}
