import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isNavMenuActive = false;
  loginVisible:boolean=false;
  homePage:boolean=true;
  tutorialPage:boolean=false;

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  toggleNavMenu() {
    this.isNavMenuActive = !this.isNavMenuActive;
  }

  login(){
    this.loginVisible=true;
  }

  // navigateToHome(){
  //   this.tutorialPage=false;
  //   this.homePage=true;
  //   this.router.navigate(['/home']);
  // }
  // navigateToTutorial() {
  //   this.homePage=false;
  //   this.tutorialPage=true;
  //   this.router.navigate(['/tutorial-page']);
    
  // }
}
