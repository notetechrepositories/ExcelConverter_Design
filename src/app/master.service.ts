import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataUpdateModel } from './model/DataUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
 

  constructor(private http:HttpClient) { }

 url="http://59.94.176.2:3241/api/"; 

  getDataConfiguration(excelFile:any): Observable<string>{
    return this.http.post<any>(this.url+"extract_database_configuration_from_spreadSheet",excelFile);
  }

  uploadFile(file:any): Observable<string>{
    return this.http.post<any>(this.url+"DatabaseConfig/getDatabaseConfig",file);
  }

  verifyConfiguration(excelData: any) {
    return this.http.post<any>(this.url+"verify_database_configuration",excelData);
  }

  verifyExcelSheet(data:any){
    return this.http.post<any>(this.url+"ExcelSheet/verifyExcelSheet",data);
  }

  convertExcel(file:any, configList:any){
    const formData = new FormData();
    formData.append('excelFile',file);
    formData.append('databaseConfigList',JSON.stringify(configList))
    console.log(formData);
    return this.http.post<any>(this.url+"convert_spreadSheet",formData);
  }

  addTable(file:any, configList:any){
    const formData = new FormData();
    formData.append('excelFile',file);
    formData.append('databaseConfigList',JSON.stringify(configList))
    console.log(formData);
    return this.http.post<any>(this.url+"add_table",formData);
  }

  generateExcelforCreation(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    return this.http.get(this.url+'generate-spreadSheet-design-for-creation', {
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
    return this.http.post(this.url+"GenerateSpreadSheetForRetrieveDatas2", data,
    {headers: headers,
    responseType: 'blob'});
  }


  generateSpreadsheetForRetrieveAllDetails(data:any):Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    return this.http.post(this.url+"GenerateSpreadSheetForRetrieveTableFieldWithDetails", data,
    {headers: headers,
    responseType: 'blob'});
  }

  generateSpreadsheetForUpdateData(data:any):Observable<Blob>{
    console.log(data);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    return this.http.post(this.url+"GenerateSpreadSheetForUpdataDatas", data,
    {headers: headers,
    responseType: 'blob'});
  }


  downloadFileForCreate(): Observable<Blob> {
    const fileUrl = 'assets/file/dummy.pdf'; // Adjust the path accordingly
    return this.http.get(fileUrl, { responseType: 'blob' });
  }

  downloadFileForDownload(): Observable<Blob> {
    const fileUrl = 'assets/file/dummy.pdf'; // Adjust the path accordingly
    return this.http.get(fileUrl, { responseType: 'blob' });
  }

  
 
}
