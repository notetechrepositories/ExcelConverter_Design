import { Component,OnInit } from '@angular/core';
import { MasterService } from '../services/master.service';
import { CompanyModel } from '../model/CompanyModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  company:CompanyModel=new CompanyModel();
  companyDetails:CompanyModel[]=[];
  severity!:string;
  ptagValue!:string;
  DetailsVisible:boolean=false;
  AddCompanyVisible:boolean=false;
  AddCompanyForm !: FormGroup;
  companyRegForm!: FormGroup;
 
  constructor(private service:MasterService,
              private fb:FormBuilder){}

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
    accessFromdate:[''],
    accessTodate:[''],
    maxUsers:[''],
    deviceLogin:['']
  });
    
}

onViewDetails(){
  this.DetailsVisible=true;
}
onAddCompany(){
  this.AddCompanyVisible=true;
}

onSubmit() {

}

onlyNumbers(event: KeyboardEvent) {
  const charCode = event.which || event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
  }
}
}
