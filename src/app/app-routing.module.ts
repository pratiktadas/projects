import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { LoginComponent } from './login/login.component';

import { Router, CanActivate } from '@angular/router';


const routes: Routes = [
		//{ path : '', redirectTo : '/dashboard', pathMatch: 'full'},
		{ path : '', component: LoginComponent },	
		{ path : 'heroes', component: HeroesComponent },
		{ path : 'dashboard', component: DashboardComponent },
		{ path : 'details/:id', component: HeroDetailsComponent }
	];

@NgModule({
  imports: [
  	 RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule{ 		

	constructor(private router: Router){}

	checkForToken(){
		if(localStorage.getItem("token")){
			return true;
		}
		this.router.navigateByUrl('/');
		return false;
	} 
}
