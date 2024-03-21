import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  accessToken = localStorage.getItem('accessToken'); 
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });

login(data:any){
  return this.http.post<any>("https://localhost:7152/api/Authentication/login",data);
}

resetPin(data:any){
  return this.http.post<any>("https://localhost:7152/api/Authentication/reset_pin_after_login",data,{ headers: this.headers })
}

companyRegistration(formData:any){
  return this.http.post<any>("https://localhost:7152/api/Authentication/register_company",formData);
}

}
