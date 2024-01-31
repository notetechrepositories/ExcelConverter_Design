import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
 


  constructor(private http:HttpClient) { }

  
  getDataConfiguration(excelFile:any): Observable<string>{
    const dataurl = `${environment.baseApiUrl}extract_database_configuration_from_spreadSheet`;
    return this.http.post<any>(dataurl,excelFile);   
  }

  uploadFile(file:any): Observable<string>{
    const dataurl = `${environment.baseApiUrl}DatabaseConfig/getDatabaseConfig`;
    return this.http.post<any>(dataurl,file);
  }

  verifyConfiguration(excelData: any) {
    const dataurl = `${environment.baseApiUrl}verify-database-configuration`;
    return this.http.post<any>(dataurl,excelData);
  }

  verifyExcelSheet(data:any){
    const dataurl = `${environment.baseApiUrl}verify-database-configuration`;
    return this.http.post<any>(dataurl,data);
    
  }

  convertExcel(file:any, configList:any){
    const formData = new FormData();
    formData.append('excelFile',file);
    formData.append('databaseConfigList',JSON.stringify(configList))
    console.log(formData);
    const dataurl = `${environment.baseApiUrl}verify-database-configuration`;
    return this.http.post<any>(dataurl,formData);
  }

  generateExcelforCreation(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const dataurl = `${environment.baseApiUrl}verify-database-configuration`;
    return this.http.get(dataurl, {
      headers: headers,
      responseType: 'blob' // This tells Angular to expect a binary file as the response
    });
  }
 
  retrieveSchema(data:any){
    const dataurl = `${environment.baseApiUrl}retrieve_schema`;
    return this.http.post<any>(dataurl,data);
  }
  
  generateSpreadsheetForRetriveData(data:any):Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const dataurl = `${environment.baseApiUrl}GenerateSpreadSheetForRetrieveDatas2`;
    return this.http.post(dataurl, data,
    {headers: headers,
    responseType: 'blob'});
  }

  generateSpreadsheetForUpdateData(data:any):Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const dataurl = `${environment.baseApiUrl}GenerateSpreadSheetForUpdataDatas`;
    return this.http.post(dataurl, data,
    {headers: headers,
    responseType: 'blob'});
  }


 
}
