import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataUpdateModel } from '../model/DataUpdateModel';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
 

  constructor(private http:HttpClient) { }

 url="http://59.94.176.2:3241/api/"; 

 accessToken = localStorage.getItem('accessToken'); 
 headers = new HttpHeaders({
   'Authorization': `Bearer ${this.accessToken}`
 });

  getDataConfiguration(excelFile:any): Observable<string>{
    return this.http.post<any>(this.url+"Extract_Database_Configuration_From_SpreadSheet",excelFile);
  }

  uploadFile(file:any): Observable<string>{
    return this.http.post<any>(this.url+"DatabaseConfig/getDatabaseConfig",file);
  }

  verifyConfiguration(excelData: any) {
    return this.http.post<any>(this.url+"Verify_Database_Configuration",excelData);
  }

  verifyExcelSheet(data:any){
    return this.http.post<any>(this.url+"ExcelSheet/verifyExcelSheet",data);
  }

  convertExcel(file:any, configList:any){
    const formData = new FormData();
    formData.append('excelFile',file);
    formData.append('databaseConfigList',JSON.stringify(configList))
    console.log(formData);
    return this.http.post<any>(this.url+"Create_Schemas_From_SpreadSheet",formData);
  }

  addTable(file:any, configList:any){
    const formData = new FormData();
    formData.append('excelFile',file);
    formData.append('databaseConfigList',JSON.stringify(configList))
    console.log(formData);
    return this.http.post<any>(this.url+"Add_Tables_To_Existed_Schemas_From_SpreadSheet",formData);
  }

  addField(file:any, configList:any){
    const formData = new FormData();
    formData.append('excelFile',file);
    formData.append('databaseConfigList',JSON.stringify(configList))
    console.log(formData);
    return this.http.post<any>(this.url+"Add_Fields_To_Existed_Schemas_From_SpreadSheet",formData);
  }

  generateExcelforCreation(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    return this.http.get(this.url+'Generate_SpreadSheet_For_Creation', {
      headers: headers,
      responseType: 'blob' // This tells Angular to expect a binary file as the response
    });
  }

  retrieveSchema(data:any){
    return this.http.post<any>(this.url+"retrieve_schema",data);
  }
  
  generateSpreadsheetForRetrieveData(data:any):Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    return this.http.post(this.url+"Generate_SpreadSheet_For_Retrieve_TableFields_Details", data,
    {headers: headers,
    responseType: 'blob'});
  }


  generateSpreadsheetForRetrieveAllDetails(data:any):Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    return this.http.post(this.url+"Generate_SpreadSheet_For_Retrieve_TableFields_With_Data", data,
    {headers: headers,
    responseType: 'blob'});
  }

  generateSpreadsheetForUpdateData(data:any):Observable<Blob>{
    console.log(data);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    return this.http.post(this.url+"Generate_SpreadSheet_For_Updation", data,
    {headers: headers,
    responseType: 'blob'});
  }


  downloadFileForCreate(): Observable<Blob> {
    const fileUrl = 'assets/file/HowItsWorks.pdf'; // Adjust the path accordingly
    return this.http.get(fileUrl, { responseType: 'blob' });
  }

  downloadFileForDownload(): Observable<Blob> {
    const fileUrl = 'assets/file/Howitsworks2.pdf'; // Adjust the path accordingly
    return this.http.get(fileUrl, { responseType: 'blob' });
  }

  companyRegistration(formData:any){
      return this.http.post<any>("https://localhost:7152/api/Authentication/register_company",formData);
    }
  


    getAuthorizedUserDetails(){

      return this.http.get<any>(`https://localhost:7152/api/User/details/authorize-user`,{ headers:this.headers })
    }


  getCompanyData() {
    return [{
      id: '1000',
      code: 'f230fh0g3',
      companyname: 'Notetech Softwares',
      city: 'Kochi',
      address: 'ABC Nagar',
      country: 'India',
      pincode: 680678,
      mobilenumber: 9090989878,
      email: 'note123@gmail.com',
      status:'Approved',
      severity:'success'
  },
  {
      id: '1001',
      code: 'g54dfh0g5',
      companyname: 'Tech Corp',
      city: 'Bangalore',
      address: 'XYZ Street',
      country: 'India',
      pincode: 560001,
      mobilenumber: 9876543210,
      email: 'techcorp@example.com',
      status:'Pending',
      severity:'primary'
  },
  {
      id: '1002',
      code: 'k24dfg0g7',
      companyname: 'DataSolutions',
      city: 'Mumbai',
      address: 'PQR Colony',
      country: 'India',
      pincode: 400001,
      mobilenumber: 8765432109,
      email: 'datasol@example.com',
      status:'Pending',
      severity:'primary'
  },
  {
      id: '1003',
      code: 'j23dfg0g9',
      companyname: 'InnoTech',
      city: 'Chennai',
      address: 'LMN Road',
      country: 'India',
      pincode: 600001,
      mobilenumber: 7654321098,
      email: 'innotech@example.com',
      status:'Denied',
      severity:'danger'
  },
  {
      id: '1004',
      code: 'l24dfg0g1',
      companyname: 'Analytica',
      city: 'Hyderabad',
      address: 'OPQ Sector',
      country: 'India',
      pincode: 500001,
      mobilenumber: 6543210987,
      email: 'analytica@example.com',
      status:'Approved',
      severity:'success'
  },
  {
      id: '1005',
      code: 'm25dfg0g3',
      companyname: 'CloudSolutions',
      city: 'Pune',
      address: 'RST Street',
      country: 'India',
      pincode: 411001,
      mobilenumber: 5432109876,
      email: 'cloudsol@example.com',
      status:'Denied',
      severity:'danger'
  },
  {
      id: '1006',
      code: 'n26dfg0g5',
      companyname: 'CyberTech',
      city: 'Delhi',
      address: 'UVW Colony',
      country: 'India',
      pincode: 110001,
      mobilenumber: 4321098765,
      email: 'cybertech@example.com',
      status:'Pending',
      severity:'primary'
  },
  {
      id: '1007',
      code: 'o27dfg0g7',
      companyname: 'InnovaSolutions',
      city: 'Kolkata',
      address: 'GHI Nagar',
      country: 'India',
      pincode: 700001,
      mobilenumber: 3210987654,
      email: 'innovasol@example.com',
      status:'Approved',
      severity:'success'
  },
  {
      id: '1008',
      code: 'p28dfg0g9',
      companyname: 'VirtualTech',
      city: 'Ahmedabad',
      address: 'JKL Street',
      country: 'India',
      pincode: 380001,
      mobilenumber: 2109876543,
      email: 'virtualtech@example.com',
      status:'Approved',
      severity:'success'
  },
  {
      id: '1009',
      code: 'q29dfg0g1',
      companyname: 'BrightSolutions',
      city: 'Jaipur',
      address: 'MNO Road',
      country: 'India',
      pincode: 302001,
      mobilenumber: 1098765432,
      email: 'brightsol@example.com',
      status:'Pending',
      severity:'primary'
  }
]

;
}
getCompanyMini() {
  console.log(this.getCompanyData());
  
  return Promise.resolve(this.getCompanyData().slice(0, 10));
  
}

 
}
