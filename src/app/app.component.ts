import { Component } from '@angular/core'; 
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterService } from './master.service';
import { DbConfig } from './model/DbConfig';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AppComponent {
  title: any;
  isLoggedIn=false;

  constructor(private router: Router){}


  ngOnInit() {
    this.loadData();
  }

  loadData(){
    if(localStorage.getItem('accessToken') != null && localStorage.getItem('pinUpdatedStatus')=="y"){
      this.isLoggedIn=true;

    }
    else{
      this.isLoggedIn=false;
      this.router.navigate(['/login']);
    }
 }
}
