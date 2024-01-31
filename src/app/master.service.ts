import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataUpdateModel } from './model/DataUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
 

  constructor(private http:HttpClient) { }

 url="http://192.168.0.110:3241/api/";

  getDataConfiguration(excelFile:any): Observable<string>{
    return this.http.post<any>("https://localhost:7198/api/extract_database_configuration_from_spreadSheet",excelFile);
  }

  uploadFile(file:any): Observable<string>{
    return this.http.post<any>("https://localhost:7152/api/DatabaseConfig/getDatabaseConfig",file);
  }

  verifyConfiguration(excelData: any) {
    return this.http.post<any>("https://localhost:7198/api/verify_database_configuration",excelData);
  }

  verifyExcelSheet(data:any){
    return this.http.post<any>("https://localhost:7152/api/ExcelSheet/verifyExcelSheet",data);
  }

  convertExcel(file:any, configList:any){
    const formData = new FormData();
    formData.append('excelFile',file);
    formData.append('databaseConfigList',JSON.stringify(configList))
    console.log(formData);
    return this.http.post<any>("https://localhost:7198/api/convert_spreadSheet",formData);
  }

  generateExcelforCreation(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    return this.http.get('https://localhost:7198/api/generate-spreadSheet-design-for-creation', {
      headers: headers,
      responseType: 'blob' // This tells Angular to expect a binary file as the response
    });
  }

  retrieveSchema(data:any){
    return this.http.post<any>("https://localhost:7198/api/retrieve_schema",data);
  }
  
  generateSpreadsheetForRetriveData(data:any):Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    return this.http.post("https://localhost:7198/api/GenerateSpreadSheetForRetrieveDatas2", data,
    {headers: headers,
    responseType: 'blob'});
  }

  generateSpreadsheetForUpdateData(data:any):Observable<Blob>{
    console.log(data);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    return this.http.post("https://localhost:7198/api/GenerateSpreadSheetForUpdataDatas", data,
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
