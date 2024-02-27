import { Component,OnInit } from '@angular/core';
import { MasterService } from '../master.service';
import { Product } from '../model/Product';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  products!: Product[];
  severity:string="primary";
  ptagValue:string="Pending";

  constructor(private service:MasterService){}

  ngOnInit() {
    this.service.getProductsMini().then((data) => {
        this.products = data;
    });
}
}
