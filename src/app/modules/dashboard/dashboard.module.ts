import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';




@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent

   ],
  imports: [
    CommonModule,
    RouterModule
    
  ]
})
export class DashboardModule { }