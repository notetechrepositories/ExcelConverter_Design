import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TutorialPageComponent } from './tutorial-page/tutorial-page.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:"home",component:HomeComponent},
  {path:"tutorial-page", component:TutorialPageComponent},
  {path:"login",component:LoginComponent},
  {path:"admin",component:AdminDashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
