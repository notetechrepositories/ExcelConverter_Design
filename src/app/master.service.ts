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

  
 
}
