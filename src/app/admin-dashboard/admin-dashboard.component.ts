import { Component,OnInit } from '@angular/core';
import { MasterService } from '../master.service';
import { Product } from '../model/Company';

import { CompanyModel } from '../model/CompanyModel';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  products!: Product[];
  company:CompanyModel=new CompanyModel();
  companyDetails:CompanyModel[]=[];
  severity!:string;
  ptagValue!:string;
  DetailsVisible:boolean=false;
  AddCompanyVisible:boolean=false;
  AddCompanyForm !: FormGroup;
 
  constructor(private service:MasterService){}

ngOnInit() {
    this.service.getCompanyMini().then((data) => {
        this.companyDetails = data;
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
