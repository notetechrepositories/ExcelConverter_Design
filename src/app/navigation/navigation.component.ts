import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../master.service';
import { CompanyDetailsModel } from '../model/CompanyDetailsModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserDetailsModel } from '../model/UserDetailsModel';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isLoggeddIn = false;
  isNavMenuActive = false;
  loginVisible:boolean=false;
  homePage:boolean=true;
  tutorialPage:boolean=false;
  AddEmployeeVisible:boolean=false;
  UserListVisible:boolean=false;
  AddEmployeeButton:boolean=false;
  editing=false;
  navigationView:Boolean=true;
  userType!: any;
  accessToken!:any;
  companyDetails:CompanyDetailsModel=new CompanyDetailsModel();
  userDetails: UserDetailsModel[] = [];
  statuses: any;


  userList: any[] = [];
  selectedUser!: any[] | null;

  userRegForm!:FormGroup

  constructor(private router: Router,
              private service:MasterService,
              private userService:UserService,
              private fb:FormBuilder) { }

  async ngOnInit() {

    this.getAuthorizedUserData();
    this.userType=localStorage.getItem('userType');
    this.accessToken=localStorage.getItem('accessToken')
    console.log(this.userType);
    console.log(this.accessToken);
    if(this.userType=="company_admin"){
      this.AddEmployeeButton=true;
    }
    else{
      this.AddEmployeeButton=false;
    }

    this.userRegForm = this.fb.group({
      name: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      adminPrivilege: ['', Validators.required]
     });

     this.statuses = [
      { label: 'Yes', value: 'y' },
      { label: 'No', value: 'n' }
  ];

  }



  toggleNavMenu() {
    this.isNavMenuActive = !this.isNavMenuActive;
  }

  onAddEmployeeButton(){
    this.AddEmployeeVisible=true;
  }

  onUserListButton(){
    this.UserListVisible=true;
    this.userService.getUserListbyCompany().subscribe(res=>{
      this.userDetails=res.data;
      
    })
  }

  getAuthorizedUserData(){
    this.service.getAuthorizedUserDetails().subscribe(res=>{
      this.companyDetails=res.data;
    })
  }

  onAddUser(){
    const formValue = this.userRegForm.value;
    let userRegData: any={
      id_t5_m_company: this.companyDetails.id_t5_m_company,
      t6_name: formValue.name,
      t6_mobile_no: formValue.mobile,
      t6_email: formValue.email,
      t6_admin: formValue.adminPrivilege
    }
    console.log(userRegData);
    
    // if(userRegData!=null){
    //   this.userService.addUserbyCompany(userRegData).subscribe({
    //     next:(res)=>{
    //       console.log(res); 
    //     },
    //     error:(error)=>{
    //       console.log(error);
    //     }
    //   })
    // }
  }

  
  deleteSelectedUser(){

  }
  deleteUser(){

  }

  logout(){
    localStorage.clear();
    this.navigationView=false;
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
