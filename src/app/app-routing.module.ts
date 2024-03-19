import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TutorialPageComponent } from './tutorial-page/tutorial-page.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ForgotAndResetComponent } from './forgot-and-reset/forgot-and-reset.component';
import { NavigationComponent } from './navigation/navigation.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: "home", component: HomeComponent},
      {path: '', component: HomeComponent},
      {path: "tutorial-page", component: TutorialPageComponent},
      {path: "admin", component: AdminDashboardComponent},
      

  {path: "login", component: LoginComponent},
  {path: "forgot-and-reset", component: ForgotAndResetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
