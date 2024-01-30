import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isNavMenuActive = false;
  loginVisible:boolean=false;



  toggleNavMenu() {
    this.isNavMenuActive = !this.isNavMenuActive;
  }

  login(){
    this.loginVisible=true;
  }
}
