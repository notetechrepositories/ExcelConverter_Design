import { Component,OnInit } from '@angular/core';
import { MasterService } from '../services/master.service';
import { CompanyModel } from '../model/CompanyModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../services/company.service';
import { CompanyDetailsModel } from '../model/CompanyDetailsModel';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  // company:CompanyModel=new CompanyModel();
  companyDetails:CompanyDetailsModel[]=[];
  severity!:string;
  ptagValue!:string;
  DetailsVisible:boolean=false;
  PopUpVisible:boolean=false;
  AddCompanyForm !: FormGroup;
  companyRegForm!: FormGroup;
  company:CompanyDetailsModel=new CompanyDetailsModel();
  isreadonly=false;
  buttonDisabled=false;
  errorMessage!:string;
  errorMessageView:boolean=false;

  AddButton=false;
  StatusButton=false;
  
 
  constructor(private service:MasterService,
              private fb:FormBuilder,
              private companyService:CompanyService,
              private datePipe:DatePipe){}

ngOnInit() {
  this.companyRegForm = this.fb.group({
    companyname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
    address: ['', Validators.required],
    address2: [''],
    city: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    zipcode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    accessFromdate:[new Date().toISOString()],
    accessTodate:[''],
    maxUsers:[''],
    deviceLogin:['']
  });

  this.getCompany();
    
}

inputboxClick(event: any) {
  this.errorMessageView=false;
}


onViewDetails(data:any){
  this.PopUpVisible=true;
  this.company=data;
  console.log(this.company.t5_approved);
  
  this.isreadonly=true;
  this.AddButton=false;
  this.StatusButton=true;
  let fromDate=this.datePipe.transform(this.company.t5_access_from_date, 'yyyy-MM-dd')
  let toDate=this.datePipe.transform(this.company.t5_access_till_date, 'yyyy-MM-dd')
  this.company.t5_access_from_date=fromDate as string;
  this.company.t5_access_till_date=toDate as string; 
  if(this.company.t5_approved == "y"){
    this.buttonDisabled=true;
  }
  else{
    this.buttonDisabled=false;
  }
}

onAddCompany(){
  this.PopUpVisible=true;
  this.company=new CompanyDetailsModel();
  this.companyRegForm.reset();
  this.isreadonly=false;
  this.AddButton=true;
  this.StatusButton=false;
  this.errorMessageView=false;
  this.company.t5_max_device_login_per_username=3;
  this.company.t5_max_users_allowed=11;
  const currentDate=new Date();
 let dateNew=this.datePipe.transform(currentDate, 'yyyy-MM-dd')
 console.log(dateNew);
 this.company.t5_access_from_date=dateNew as string;
 this.company.t5_access_till_date=dateNew as string;
}

onSubmit() {
  if(this.companyRegForm.valid){
    this.companyService.companyRegistrationByNotetech(this.company).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(error)=>{
        console.log(error);
        
        this.errorMessage=error.error.message;
        this.errorMessageView=true;
      }
     })  
  }
  else{
    this.companyRegForm.markAllAsTouched();
      return;
  }
}

getCompany(){
  this.companyService.getAllCompany().subscribe(res=>{
    this.companyDetails=res.data;
    console.log(this.companyDetails);
    
  })
}

updateLoginPermissionStatus(status:string){
let updatedata:any={
  t5_approved:status
}
  this.companyService.updateLoginPermission(this.company.id_t5_m_company,updatedata).subscribe({
    next:(res)=>{
      if(res.status==200){
        this.PopUpVisible=false;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "",
          showConfirmButton: false,
          timer: 3000
        });
      }
      
    },
    error:(error)=>{
      console.log(error);
      
    }
  })
  
}

onlyNumbers(event: KeyboardEvent) {
  const charCode = event.which || event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
  }
}

}
