import { Component } from '@angular/core';
import { MasterService } from '../master.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DbConfig } from '../model/DbConfig';
import { EMPTY } from 'rxjs';
import { DbConfigModel } from '../model/DbConfigModel';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { DataRetrieveModel } from '../model/DataRetrieveModel';
import { DataUpdateModel } from '../model/DataUpdateModel';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  selectedFile: File | undefined;
  responseMessage: string = "";
  verifyErrorMessage: any[] = [];
  convertErrorMessage: any[] = [];
  errorMessage: string = "";
  homepage = true;
  tutorialPage = false;
  verifyMessage = false;
  invalidMessage = false;
  verifyButton=true;
  errorLabel = false;
  warningLabel = false;
  warningLabel2 = false;
  openPopup = false;
  errorListBox = false;
  configurationForm = false;
  configurationFormCover = false;
  loadingScreen = false;
  successScreen = false;
  convertErrorScreen=false;
  CreateRetrieveUpdateBtn=false;
  isBlinking = false;

  dataConfig_list: any = [];
  dataConfig: any = [];
  excelData = new DbConfig();
  dataRetrieve=new DataRetrieveModel();
  updateDataObject:DataUpdateModel=new DataUpdateModel();

  excel: any[] = [];
  excelList !: DbConfig;
  hostname: any[] = [];
  portname: any[] = [];
  databasename: any[] = [];
  database:any[]=[];
  databaseNameList: any[] = [];
  retrieveDataDatabaseList:any[]=[];
  finalList: any[] = [];
  host: string = '';
  port: string = '';
  visible: boolean = false ;
  Errorvisible:boolean=false;
  RetiveDataVisible:boolean=false;
  UpdateDataVisible:boolean=false;
  tableName:string[]=[];
  dbTableList:any=[];
  selectedDatabaseName!: string;
  selectedTableName:any[]=[];
  excels: any;
  updateDatabaseList:any;

  configDialog: boolean = false;
  selectedConfiguration!: any[] | null;
  selectedDbAndTableList!: any[] | null;
  submitted: boolean = false;
  dialogBackgroundColor: string = '#dd4444';



  constructor(private service: MasterService, private messageService: MessageService, private confirmationService: ConfirmationService, private ConfirmationServe:ConfirmationService,
    private router: Router) { }


  ngOnInit() {

  }


  navigateToTutorial() {
    this.router.navigate(['/tutorialPage']);
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.errorLabel = false;
    this.warningLabel = false;
    this.errorListBox = false;
  }

  showDialog() {
    this.visible = true;
  }
  stopBlinking(): void {
    this.isBlinking = false;
  }

  getDataConfiguration() {
    this.hostname = [];
    this.verifyButton=true;
    this.verifyMessage = false;
    this.invalidMessage = false;
    this.configurationForm = true;
    this.configurationFormCover=false;
    this.loadingScreen = false;
    this.successScreen = false; 
    this.errorListBox = false;
    this.convertErrorScreen=false;
    this.CreateRetrieveUpdateBtn=false;
    this.isBlinking=false;
    this.warningLabel2 = false;

    if (this.selectedFile) {
      console.log(this.selectedFile);
      
      const formData = new FormData();
      formData.append('excelFile', this.selectedFile);
      // this.service.verifyExcelSheet(formData).subscribe((res: any) => {
      //   if (res.status == 200) {
          this.service.getDataConfiguration(formData).subscribe(
            (fileres: any) => {
              if (fileres.status === 200) {
                this.visible = true;
                this.dataConfig = fileres;
                this.dataConfig_list = Object.values(fileres);
                console.log(this.dataConfig_list);
                this.portname = [];
                this.databasename = [];
                this.excelData = new DbConfig();
                this.excel = [];
                let host = Object.keys(this.dataConfig_list[0]);
                for (var i = 0; i < host.length; i++) {
                  let key = { 'host': host[i] }
                  this.hostname.push(key);
                  console.log(this.hostname);
                }
              }
              else {
                console.error('Error retrieving database configurations:', fileres.message);
                this.responseMessage = fileres.message;
                console.log(this.responseMessage);
                
                this.errorLabel = true;
                this.warningLabel = false;
              }
            }
          );
      //   }
      //   else {
      //     this.verifyErrorMessage = res.message;
      //     this.errorLabel = false;
      //     this.warningLabel = false;
      //     this.errorListBox = true;
      //   }
      // });
    }
    else {
      this.errorLabel = false;
      this.warningLabel = true;
    }
  }


  selectport(event: any) {
    this.portname = [];
    this.verifyButton=true;
    this.verifyMessage = false;
    this.invalidMessage = false;
    this.excelData.DatabaseName = '';
    this.dataConfig_list = Object.values(this.dataConfig);
    var objectContainingIP = this.dataConfig_list[0];
    console.log(objectContainingIP);
    this.dataConfig_list = objectContainingIP[event.value.host];
    let port = Object.keys(this.dataConfig_list);
    for (var i = 0; i < port.length; i++) {
      let key = { port: port[i] }
      this.portname.push(key);
      console.log(this.portname);
    }
    this.databasename = [];
  }


  selectDatabase(event: any) {
    this.excelData.DatabaseName = '';
    this.databasename = [];
    var objectContainingIP = this.dataConfig_list;
    let database = objectContainingIP[event.value.port];
    for (var i = 0; i < database.length; i++) {
      let key = { database: database[i] }
      this.databasename.push(key);
    }
  }


  onVerify() {
    if(!this.excelData.SqlUsername|| !this.excelData.SqlPassword){
 
        if(!this.excelData.SqlUsername) {
          this.isBlinking = true;
        }
        if(!this.excelData.SqlPassword) {
          this.isBlinking = true;
        }
    }

    else{
      this.warningLabel2 = false;
      const convertedConfig = {
        host: (this.excelData.SqlHost as any).host,
        port: (this.excelData.SqlPort as any).port,
        username: this.excelData.SqlUsername,
        password: this.excelData.SqlPassword,
        databasename: []
      }
      this.databasename.push(this.excelData.DatabaseName);
      this.service.verifyConfiguration(convertedConfig).subscribe((res) => {
        if (res.status == 200) {
          this.verifyMessage = true;
          setTimeout(() => {
            this.verifyMessage = false;
            this.verifyButton=true;
          }, 3000);
          this.invalidMessage = false;
          this.verifyButton=false;
          for (var i = 0; i < this.excelData.DatabaseName.length; i++) {
            let db = (this.excelData.DatabaseName[i] as any).database;
            const converted = {
              id: Math.floor(Math.random() * 100),
              DatabaseName: db,
              SqlHost: convertedConfig.host,
              SqlPort: convertedConfig.port,
              SqlUsername: convertedConfig.username,
              SqlPassword: convertedConfig.password
            };
            if ((this.excel.some(config => config.DatabaseName === converted.DatabaseName) == false) ||
              (this.excel.some(config => config.SqlHost === converted.SqlHost) == false)
              || (this.excel.some(config => config.SqlPort === converted.SqlPort) == false)) {
              this.excel.push(converted);
              console.log(this.excel);
              
            }
          }
          this.excelData = new DbConfig();
          this.portname = [];
          this.databasename = [];
        }
        else {
          console.log(res.status);
          this.invalidMessage = true;
          this.verifyMessage = false;
          this.verifyButton=false;
  
          // const box = document.getElementById('inputbox');
          // if(box!=null){
          //   box.style.borderColor ='red';
          // }
  
        }
      })
    }
   
  }

  inputboxClick(event:any){
    this.invalidMessage=false;
    this.verifyButton=true;
    this.verifyMessage=false;
    this.isBlinking = false;
  }


  onProceed() {
    const groupedByHost = this.excel.reduce((acc, item) => {
      const key = `${item.SqlHost}-${item.SqlPort}-${item.SqlUsername}-${item.SqlPassword}-${item.DatabaseName}`;
      if (!acc[key]) {
        acc[key] = {
          host: item.SqlHost,
          port: item.SqlPort,
          username: item.SqlUsername,
          password: item.SqlPassword,
          databaseName: item.DatabaseName
        };
      }
      return acc;
    }, {});

    this.finalList = Object.values(groupedByHost);
    console.log(this.finalList);
    if (this.excel.length > 0) {
      this.warningLabel2 = false;
      this.configurationForm = false;
      this.convertExcelData();  
    }
    else {
      this.errorMessage = 'Not found the verified database configuration';
      this.warningLabel2 = true;
    }
  }



  convertExcelData(){
    if(this.selectedFile && this.finalList != null){
      this.loadingScreen = true;
      this.service.convertExcel(this.selectedFile,this.finalList).subscribe((convertResponse:any)=>{
        
        console.log(this.finalList);
        if(convertResponse.status==200){
          this.loadingScreen = false;
          this.visible = false;
          this.successScreen = true;
          if (this.successScreen) {
            setTimeout(() => {
              this.loadingScreen = false;
              this.successScreen = false;
            }, 3000);
          }
        }
        else{
          this.convertErrorMessage=convertResponse.message;
          this.visible = false;
          this.Errorvisible=true;
          this.successScreen = false;
          this.loadingScreen = false;
        }
        
      })
    }
  }


  closeErrorWindow(){
    this.convertErrorScreen=false;
  }


  
  deleteSelectedConfiguration() {
    console.log(this.selectedConfiguration);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected database configurations?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excel = this.excel.filter((val) => !this.selectedConfiguration?.includes(val));
        this.selectedConfiguration = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Connection Deleted', life: 3000 });
      }
    });
  }


  deleteConfigurations(data: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete database configuration?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excel = this.excel.filter((val) => (val.id !== data.id));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Connection Deleted', life: 3000 });
      }
    });
  }


  hideDialog() {
    this.configDialog = false;
    this.submitted = false;
  }

// Excel generate

onclickDownLoad(){
  this.CreateRetrieveUpdateBtn = !this.CreateRetrieveUpdateBtn;
  this.errorLabel = false;
  this.warningLabel = false;
  this.errorListBox=false;
}

downloadExcel(): void {
  this.service.generateExcelforCreation().subscribe(blob => {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = 'DesignCreation.xlsx';
    anchor.href = url;
    anchor.click();
    window.URL.revokeObjectURL(url);
    
  });
}

  

onretrieve(){
  this.RetiveDataVisible=true;
  this.dataRetrieve.Host='';
  this.dataRetrieve.Port='';
  this.dataRetrieve.Username='';
  this.dataRetrieve.Password='';
  this.dataRetrieve.DatabaseName='';
  this.databaseNameList=[];
  this.tableName=[];
  this.dataRetrieve.Table=[];
  this.verifyButton=true;
  this.verifyMessage=false;
  this.retrieveDataDatabaseList=[];
  this.isBlinking=false;
  this.warningLabel2 = false;


}
retrivedataVerification(){
  if(!this.dataRetrieve.Host||!this.dataRetrieve.Port||!this.dataRetrieve.Username||!this.dataRetrieve.Password){
    if (!this.dataRetrieve.Host){
      this.isBlinking = true;
    }
    if(!this.dataRetrieve.Port){
      this.isBlinking = true;
    }  
      if(!this.dataRetrieve.Username){
        this.isBlinking = true;
      } 
      if(!this.dataRetrieve.Password) {
        this.isBlinking = true;
      }
  }
 

  else{
    this.service.retrieveSchema(this.dataRetrieve).subscribe((res=>{
      console.log(res.status);
      
      if(res.status == "200"){
        this.database=res.data;
        this.databaseNameList=Object.keys(res.data);
        this.verifyMessage=true;
        this.verifyButton=false;
      }
      else{
        this.invalidMessage=true;
        this.verifyButton=false;
    }
      
    }));
  }
  
}


onDatabaseSelect(event:any) {
  this.dataRetrieve.Table=[];
  const dbName = event.value; // Get the selected database name
  this.selectedDatabaseName = dbName;
  this.tableName = this.database[dbName]; // Get the tables for the selected database     
} 

onTableSelect(event: any) {
  this.selectedTableName = event.value;
  console.log(this.selectedTableName);
 
}

addToRetrieveDatabaseList(){
  const convertedConfig = {
    host:this.dataRetrieve.Host,
    port: this.dataRetrieve.Port,
    username: this.dataRetrieve.Username,
    password: this.dataRetrieve.Password,
    databaseName:this.selectedDatabaseName,
    tableName:this.selectedTableName
  }
  this.retrieveDataDatabaseList.push(convertedConfig) ;

  // const indexToRemove = this.databaseNameList.indexOf(this.selectedDatabaseName);
  // if (indexToRemove !== -1) {
  //   this.databaseNameList.splice(indexToRemove, 1);
  // }

  
}


deleteSelectedList() {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete the selected database and  table list?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.retrieveDataDatabaseList = this.retrieveDataDatabaseList.filter((val) => !this.selectedDbAndTableList?.includes(val));
      this.selectedDbAndTableList = [];
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000 });
    } 
  });
}


deleteList(data: any) {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete database?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.retrieveDataDatabaseList = this.retrieveDataDatabaseList.filter((val) => (val.databaseName !== data.databaseName));
      this.selectedDbAndTableList = [];
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Connection Deleted', life: 3000 });
    }
  });
}


onGenerateOfReteiveData(){
  console.log(this.retrieveDataDatabaseList);
  
 if(this.retrieveDataDatabaseList.length>0){
  this.service.generateSpreadsheetForRetriveData(this.retrieveDataDatabaseList).subscribe(blob=>{
    console.log(blob);
    this.downloadFile(blob, 'STM_SpreadSheetFiles.zip');
  }, error => {
    console.error('Error downloading the file.');
  });
 }
 else{
  this.errorMessage = 'Not found the database and table list';
  this.warningLabel2 = true;
 }
  
}

onUpdateClick(){
  this.UpdateDataVisible=true;
  this.dataRetrieve.Host='';
  this.dataRetrieve.Port='';
  this.dataRetrieve.Username='';
  this.dataRetrieve.Password='';
  this.dataRetrieve.DatabaseName='';
  this.dataRetrieve.Table=[];
  this.verifyButton=true;
  this.verifyMessage=false;
}

onGenerateOfUpdateData(){
  
  this.updateDataObject.host=this.dataRetrieve.Host;
  this.updateDataObject.port=this.dataRetrieve.Port;
  this.updateDataObject.username= this.dataRetrieve.Username;
  this.updateDataObject.password=this.dataRetrieve.Password;
  this.updateDataObject.databaseName=this.selectedDatabaseName;
  this.updateDataObject.tableName=this.selectedTableName;

  var fileName=this.selectedDatabaseName+'.xlsx';
  this.service.generateSpreadsheetForUpdateData(this.updateDataObject).subscribe((res)=>{
    this.downloadFile(res, fileName);
  }, error => {
    console.error('Error downloading the file.');
  });
}

private downloadFile(data: Blob, filename: string) {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  window.URL.revokeObjectURL(url);
  anchor.remove();
}

downloadPDFTemplate(): void {
  this.service.downloadFileForDownload().subscribe(blob => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'dummy.pdf'; // Adjust the filename as needed
    link.click();
  });
}

}



