import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  AddEmployeeButton:boolean=false;
  navigationView:Boolean=true;
  userType!: any;

  constructor(private router: Router) { }

  async ngOnInit() {
    if(this.userType=="notetech" || this.userType=="user"){
      this.AddEmployeeButton=false;
    }
    else{
      this.AddEmployeeButton=true;
    }
  }



  toggleNavMenu() {
    this.isNavMenuActive = !this.isNavMenuActive;
  }

  onAddEmployee(){
    this.AddEmployeeVisible=true;
  }

  onSubmit(){

  }

  logout(){
    localStorage.clear();
    this.navigationView=false;
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
