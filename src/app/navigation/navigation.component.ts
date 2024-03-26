import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../services/master.service';
import { CompanyDetailsModel } from '../model/CompanyDetailsModel';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserDetailsModel } from '../model/UserDetailsModel';
import { ConfirmationService, MessageService } from 'primeng/api';


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
  HowItsWork=false;
  editing=false;
  navigationView:Boolean=true;
  userType!: any;
  accessToken!:any;
  companyDetails:CompanyDetailsModel=new CompanyDetailsModel();
  userDetails: UserDetailsModel[] = [];
  userData:any[] = [];
  statuses: any;
  errorMessageView:boolean=false;
  errorMessage!:string;
  successMessageView:boolean=false;
  successMessage!:string;


  userList: any[] = [];
  selectedUser: any[] =[];

  userRegForm!:FormGroup

  constructor(private router: Router,
              private service:MasterService,
              private userService:UserService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private fb:FormBuilder) { }

  ngOnInit() {

    this.getAuthorizedUserData();
    this.userType=localStorage.getItem('userType');
    this.accessToken=localStorage.getItem('accessToken')
    console.log(this.userType);
    console.log(this.accessToken);
    if(this.userType=="company_admin"){
      this.AddEmployeeButton=true;
      this.HowItsWork=true;
    }
    else{
      this.AddEmployeeButton=false;
      this.HowItsWork=false;
    }

    this.userRegForm = this.fb.group({
      name: ['', Validators.required],
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

  onlyNumbers(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }
  inputboxClick(event: any) {
    this.errorMessageView=false;
  }


  onAddEmployeeButton(){
    this.AddEmployeeVisible=true;
    this.userRegForm.reset({
      name: '',
      email: '',
      mobile: '',
      adminPrivilege: ''
    });
    this.errorMessageView=false;
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

  updateUserPrivilege(id:number,event:any){
    let updateData:any={
        id_t6_company_users: id,
        t6_admin:event.value
      }
      this.userService.updateUserPrivilagebyCompany(updateData).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status==400){
            this.errorMessage=res.message;
            this.errorMessageView=true;
          }
          else{
            this.errorMessageView=false;
            this.successMessage=res.message;
            this.successMessageView=true;
            setTimeout(() => {
              this.successMessageView=false;
            }, 3000);
          }
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
    
  
  onAddUser(){
    if (this.userRegForm.invalid) {
      this.userRegForm.markAllAsTouched();
      return;
    }
    else{
    const formValue = this.userRegForm.value;
    let userRegData: any={
      id_t5_m_company: this.companyDetails.id_t5_m_company,
      t6_name: formValue.name,
      t6_mobile_no: formValue.mobile,
      t6_email: formValue.email,
      t6_admin: formValue.adminPrivilege
    }
    if(userRegData!=null){
      this.userService.addUserbyCompany(userRegData).subscribe({
        next:(res)=>{
          console.log(res); 
          this.userRegForm.reset();
        },
        error:(error)=>{
          console.log(error);
          
          this.errorMessage=error.error.message;
          this.errorMessageView=true;
        }
      })
    }
    }
    
  }

  
  deleteSelectedUser(){
    this.confirmationService.confirm({  
      message: 'Are you sure you want to delete the selected database configurations?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userDetails = this.userDetails.filter((val) => !this.selectedUser?.includes(val));
        console.log(this.selectedUser);

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      }
    });
  }

  deleteUser(data:any){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete database configuration?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userDetails = this.userDetails.filter((val) => (val.id_t6_company_users !== data.id_t6_company_users));
        console.log(data.id_t6_company_users);
          this.userService.deleteUserById(data.id_t6_company_users).subscribe({
            next:(res)=>{
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: 'Successfully Deleted', life: 3000 });
            },
            error:(error)=>{
              console.log(error.error.message);
              this.messageService.add({ severity: 'error', summary: 'Unsuccessfull', detail: error.error.message, life: 3000 });
            }
          })
      }
    });
  }

  logout(){
    localStorage.clear();
    this.navigationView=false;
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
