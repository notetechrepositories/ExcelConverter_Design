import { Component } from '@angular/core';
import { MasterService } from '../master.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DbConfig } from '../model/DbConfig';

@Component({
  selector: 'app-tutorial-page',
  templateUrl: './tutorial-page.component.html',
  styleUrls: ['./tutorial-page.component.css']
})
export class TutorialPageComponent {

  selectedFile:File|undefined;
  responseMessage:string="";
  errorMessage:string="";
  homepage=true;
  tutorialPage=false;
  verifyMessage=false;
  invalidMessage=false;
  errorLabel=false;
  warningLabel=false;
  openPopup=false;
  dataConfig_list:any=[];
  dataConfig:any=[];
  excelData = new DbConfig();
  excel: any[]=[];
  excelList !: DbConfig;
  hostname:any[]=[];
  portname:any[]=[];
  databasename:any[]=[];
  finalList:any[]=[];
  host:string='';
  port:string='';
    
  excels: any;

  productDialog: boolean = false;

  selectedProducts!: any[] | null;

  submitted: boolean = false;


  constructor(private service:MasterService, private messageService: MessageService, private confirmationService: ConfirmationService,
              private router:Router){}

  
 ngOnInit() {
   
 }
            
 navigateToTutorial(){
  this.router.navigate(['/tutorialPage']);
 }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; 
    this.errorLabel=false;
    this.warningLabel=false;
    
  }

  // closePopup(){
  //   this.openPopup=false;
  //   this.hostname=[];
  //   console.log(this.hostname);
    
  // }
  getDataConfiguration() {
    if (this.selectedFile) {
      this.openPopup=true;
      const formData = new FormData();
      formData.append('excelFile', this.selectedFile);
      this.service.uploadFile(formData).subscribe(
        (res: any) => {     
          if (res.status === 200) 
          {   
            this.dataConfig=res;
            this.dataConfig_list = Object.values(res);
            console.log(this.dataConfig_list);
            this.portname=[];
            this.databasename=[];
            this.excelData=new DbConfig();
            this.excel=[];
            let host= Object.keys(this.dataConfig_list[0]);
                      
            for(var i=0; i<host.length;i++){
              let key={'host':host[i]}
              this.hostname.push(key);
              console.log(this.hostname);          
            }
          } 
          else
          {
            console.error('Error retrieving database configurations:', res.message);
            this.responseMessage=res.message;
            this.openPopup=false;
            this.errorLabel=true;
            this.warningLabel=false;
          }
        },
      );
    }
    else{
      this.errorLabel=false;
      this.warningLabel=true;
    }
  }

  // onUpload(){
  //   this.openPopup=true;
  //   this.dataConfig_list = Object.values(this.dataConfig);
  //   console.log(this.dataConfig_list);
  //   this.portname=[];
  //   this.databasename=[];
  //   this.excelData=new DbConfig();
  //   this.excel=[];
  //   let host= Object.keys(this.dataConfig_list[0]);
          
  //   for(var i=0; i<host.length;i++){
  //     let hostkey={'host':host[i]}
  //     this.hostname.push(hostkey);
  //     console.log(this.hostname);          
  //   }
  // }

  closepopup(){
    this.hostname=[];
    console.log(this.hostname);
    
  }

  selectport(event:any){
    
    this.portname=[];
    this.verifyMessage=false;
    this.invalidMessage=false;
    this.excelData.DatabaseName= '';
    this.dataConfig_list = Object.values(this.dataConfig);
    var objectContainingIP = this.dataConfig_list[0]; 
    console.log(objectContainingIP);
    this.dataConfig_list = objectContainingIP[event.value.host];
    let port = Object.keys(this.dataConfig_list);
    for(var i=0; i<port.length;i++){
      let key={port:port[i]}
      this.portname.push(key);
      console.log(this.portname);
      
    } 
    this.databasename=[]; 
  }

  selectDatabase(event:any){
    this.excelData.DatabaseName= '';
   this.databasename=[];
   
    var objectContainingIP = this.dataConfig_list;
    let database = objectContainingIP[event.value.port];
    for(var i=0; i<database.length;i++){
      let key={database:database[i]}
      this.databasename.push(key);
    }  
  }
  
  onVerify(){
   
    const convertedConfig = {
          hostName:(this.excelData.SqlHost as any).host,
          port:(this.excelData.SqlPort as any).port,
          username: this.excelData.SqlUsername,
          password: this.excelData.SqlPassword
        }
    this.service.verifyConfiguration(convertedConfig).subscribe((res)=>{
      if(res.status==200){
  
        this.verifyMessage=true;
        this.invalidMessage=false;
        for(var i=0;i<this.excelData.DatabaseName.length; i++){
          
          let db=(this.excelData.DatabaseName[i] as any).database;
          const converted = {  
              id:Math.floor(Math.random() * 100),
              DatabaseName:db,
              SqlHost:convertedConfig.hostName,
              SqlPort: convertedConfig.port,
              SqlUsername: convertedConfig.username,
              SqlPassword:convertedConfig.password
          };
          
          if((this.excel.some(config => config.DatabaseName === converted.DatabaseName)== false)||
          (this.excel.some(config => config.SqlHost === converted.SqlHost)== false)
                  ||(this.excel.some(config => config.SqlPort === converted.SqlPort)== false)){
            this.excel.push(converted);
          }
          
         } 
         this.excelData=new DbConfig();
         this.portname=[];
         this.databasename=[];
         
      }
      else{
        console.log(res.status);
        this.invalidMessage=true;
        this.verifyMessage=false;
      }
      
    })
 
  }
  
onSubmit(){

    const groupedByHost = this.excel.reduce((acc, item) => {
      const key = `${item.SqlHost}-${item.SqlPort}-${item.SqlUsername}-${item.SqlPassword}`;
      if (!acc[key]) {
        acc[key] = {
          SqlHost: item.SqlHost,
          SqlPort: item.SqlPort,
          SqlUsername: item.SqlUsername,
          SqlPassword: item.SqlPassword,
          databaseName: []
        };
      }
      acc[key].databaseName.push(item.DatabaseName);
      return acc;
    }, {});

    this.finalList = Object.values(groupedByHost);
    console.log(this.finalList);

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('ExcelFile', this.selectedFile);
  
      this.service.uploadFile(formData).subscribe(
        (res: any) => {
          console.log(res.status)
          if ( res.status == 200 ) {
            this.responseMessage = res.message;
            this.errorMessage = "";
            console.log(this.responseMessage);
            
          }
        },
        (error: any) => {
          this.errorMessage = error;
          this.responseMessage = "";
        }
      );
    } else {
      this.errorMessage = 'Please select a file before submitting.';
      this.warningLabel=false;
    }
  
  
}

  convert() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('ExcelFile', this.selectedFile);
  
      this.service.uploadFile(formData).subscribe(
        (res: any) => {
          console.log(res.status)
          if ( res.status == 200 ) {
            this.responseMessage = res.message;
            this.errorMessage = "";
          }
        },
        (error: any) => {
          this.errorMessage = error;
          this.responseMessage = "";
        }
      );
    } else {
      this.errorMessage = 'Please select a file before submitting.';
    }
}

  deleteSelectedProducts() {
    console.log(this.selectedProducts);
    
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.excel = this.excel.filter((val) => !this.selectedProducts?.includes(val));
            this.selectedProducts = null;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Connection Deleted', life: 3000 });
        }
    });
}



deleteProduct(data: any) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.excel = this.excel.filter((val) => (val.id!== data.id));
             
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Connection Deleted', life: 3000 });
        }
    });
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}




}
