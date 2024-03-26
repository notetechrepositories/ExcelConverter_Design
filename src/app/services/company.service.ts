import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

  url="http://59.94.176.2:3241/api/"; 

  accessToken = localStorage.getItem('accessToken'); 
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });

  companyRegistrationByNotetech(formData:any){
    return this.http.post<any>("https://localhost:7152/api/Company/add",formData,{headers:this.headers});
  }

  getAllCompany(){
    return this.http.get<any>(`https://localhost:7152/api/Company/details/all`,{headers:this.headers});
  }

  getCompanyById(id:number){
    return this.http.get<any>(`https://localhost:7152/api/Company/deatils/by-id?companyId=${id}`,{headers:this.headers});
  }
  
  updateLoginPermission(id:any,data:any){
    console.log(this.accessToken);
    console.log(this.headers);
  
    
    return this.http.put<any>(`https://localhost:7152/api/Company/update/status/${id}`,data,{headers:this.headers});
    
    
  }
}
