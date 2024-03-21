import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  url="http://59.94.176.2:3241/api/"; 

  accessToken = localStorage.getItem('accessToken'); 
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });

  addUserbyCompany(formData:any){ 
    return this.http.post<any>("https://localhost:7152/api/User/add",formData,{headers:this.headers});
  }

  getUserListbyCompany(){
    return this.http.get<any>(`https://localhost:7152/api/User/all/company-admin`,{headers:this.headers});
  }
  
  updateUserPrivilagebyCompany(){
    return this.http.put<any>(`https://localhost:7152/api/User/update/user-permission`,{headers:this.headers});
  }

}
