import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataUpdateModel } from './model/DataUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
 

  constructor(private http:HttpClient) { }

  
  getDataConfiguration(excelFile:any): Observable<string>{
    return this.http.post<any>("http://59.94.176.2:3241/api/extract_database_configuration_from_spreadSheet",excelFile);
  }

  uploadFile(file:any): Observable<string>{
    return this.http.post<any>("http://59.94.176.2:3241/api/DatabaseConfig/getDatabaseConfig",file);
  }

  verifyConfiguration(excelData: any) {
    return this.http.post<any>("http://59.94.176.2:3241/api/verify_database_configuration",excelData);
  }

  verifyExcelSheet(data:any){
    return this.http.post<any>("http://59.94.176.2:3241/api/ExcelSheet/verifyExcelSheet",data);
  }

  convertExcel(file:any, configList:any){
    const formData = new FormData();
    formData.append('excelFile',file);
    formData.append('databaseConfigList',JSON.stringify(configList))
    console.log(formData);
    return this.http.post<any>("http://59.94.176.2:3241/api/convert_spreadSheet",formData);
  }

  generateExcelforCreation(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    return this.http.get('http://59.94.176.2:3241/api/generate-spreadSheet-design-for-creation', {
      headers: headers,
      responseType: 'blob' // This tells Angular to expect a binary file as the response
    });
  }

  retrieveSchema(data:any){
    return this.http.post<any>("http://59.94.176.2:3241/api/retrieve_schema",data);
  }
  
  generateSpreadsheetForRetriveData(data:any):Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    return this.http.post("http://59.94.176.2:3241/api/GenerateSpreadSheetForRetrieveDatas2", data,
    {headers: headers,
    responseType: 'blob'});
  }

  generateSpreadsheetForUpdateData(data:any):Observable<Blob>{
    console.log(data);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    return this.http.post("http://59.94.176.2:3241/api/GenerateSpreadSheetForUpdataDatas", data,
    {headers: headers,
    responseType: 'blob'});
  }

 
}
