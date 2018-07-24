import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray} from '@angular/forms';
import { LoginService } from '../login.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

	formdata;
	error;

	// setTimeout(function() {
	// 		console.log("set timeout function called");
 //  			this.error = null;
	// }.bind(this), 3);

	constructor(private loginService: LoginService, private location: Location, private router: Router) { }
	
	ngOnInit() {

		this.formdata = new FormGroup({
			email: new FormControl("", Validators.compose([
					Validators.required,
					Validators.pattern("[^ @]*@[^ @]*")
			])),
			password: new FormControl("", Validators.compose([
				Validators.required
			]))
		});
	}

	onClickSubmit(data) : void {
		
		this.loginService.login(data)
						 .subscribe(
							data => { this.goToDashboard(data) }, 
							error => { this.error = error.error.message },
							() => { console.log("login service") }
						 );
	}

	goToDashboard(data): void{
		localStorage.setItem('token', data.token);
		console.log(localStorage.getItem('token'));
		this.router.navigateByUrl('/dashboard');

	}	 

}
