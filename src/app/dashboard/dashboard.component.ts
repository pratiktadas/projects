import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { User } from '../user_object';
import { Router } from '@angular/router';
import {  HttpEventType } from '@angular/common/http';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //contacts : UserR[] = []; 

	heroes: Hero[] = [];

  user: any = {};

  allUsers : any;
  selectedAll: any;
  selectedUsers: any;

  checkedUser = [];

  dropDownselected: any;

  myForm;
  error;
  successMsg;

  myReactiveForm: FormGroup;
  
  selectedFile : File = null;


  constructor(private heroService: HeroService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {

    if(!localStorage.getItem("token")){
      this.router.navigateByUrl('/');
      return false;    
    }

    this.getHeroes();

    this.myForm = new FormGroup({
      username    :   new FormControl('', Validators.compose([
                        Validators.required
                      ])),
      email       :   new FormControl('', [
                        Validators.required,
                        Validators.pattern("[^ @]*@[^ @]*")
                      ]),
      password    :   new FormControl('',Validators.compose([
                        Validators.required,
                      ])),
      selected    :   new FormControl('',Validators.compose([
                        Validators.required
                      ])),
      gender      :   new FormControl('',Validators.compose([
                        Validators.required
                      ]))
    });


    // Reactive form //
    this.myReactiveForm = this.fb.group({
      email : new FormControl('',Validators.compose([
                Validators.required,
                Validators.pattern("[^ @]*@[^ @]*")
              ])),
      phones : this.fb.array([ this.initArrayvlidation(), ])
    });

    //this.initItemRows();
  }

  initArrayvlidation() {
    return this.fb.group({
      area : ['', Validators.required],
      line : ['', Validators.required],
      prefix : [],
    });    
  }


  getHeroes(): void {
  		this.heroService.getHeroes()
        .subscribe(heroes =>  {
          this.heroes = heroes.slice(1,5),
          this.allUsers = heroes
        });
  }

  createUser(): void {
    this.heroService.createUser(this.user)
      .subscribe(data =>  this.getHeroes() );
  }


  logout(): void{
    localStorage.clear();
    this.router.navigateByUrl("/");
  }


  selectAll(checked): void{
    
    if(checked === true){
      this.checkedUser = this.heroes; 
    }else{
      this.checkedUser = [];
    }

    //console.log(this.checkedUser);
     for (var i = 0; i < this.heroes.length; i++) {
      this.heroes[i].selected = this.selectedAll;
    }
  }


  checkIfAllSelected(chkdORnot, id): void{

    if(chkdORnot == true){
        console.log(chkdORnot);
        var findbyid = this.allUsers.filter(item => item._id === id)[0];
        delete findbyid.status, delete findbyid.user_contact, 
        delete findbyid.flashcard, delete findbyid.password;
        this.checkedUser.push(findbyid);
        //console.log(this.checkedUser);
    } else{
      console.log(chkdORnot);
      this.checkedUser =  this.checkedUser.filter(function( obj ) {
                            return obj._id !== id;
                          });
      //console.log(this.checkedUser);
    }
    /*this.selectedAll = this.heroes.every(function(item:any) {
        return item.selected == true;
    })*/
  }

  // drop down selection 
  selectedFromDropDown(event): void{
    console.log(this.dropDownselected);
  }


  addLanguage(lang): void{
     console.log(lang);
  }

  addNewUser(formdata): void{
    console.log("template based form validation", formdata);

    /*this.heroService.createUser(formdata)
      .subscribe( data => { this.getHeroes(), this.successMsg = data, this.myForm.reset() },
                  error => { console.log(error) },
                  () => {}
                );  */ 
  }

  get phoneForms() {
      return this.myReactiveForm.get('phones') as FormArray;
  }

  addPhone() {
    /*const phone = this.fb.group({
      area: [],
      prefix: [],
      line: []
    });*/
    
    /* original code */
    //this.phoneForms.push(phone);
    //console.log("add phones ====>", this.phoneForms);
    
    //this.initItemRows();
    //this.phoneForms.push(this.initItemRows);
 
    const control = <FormArray>this.myReactiveForm.controls['phones'];
    control.push(this.initArrayvlidation());
    console.log("worked");
  }

  deletePhone(i) {
    //this.phoneForms.removeAt(i);
    console.log("remove of i from arrya -->", i);
    const control = <FormArray>this.myReactiveForm.controls['phones'];
    control.removeAt(i);
  }

  initItemRows() {
    let ctrl = <FormArray>this.myReactiveForm.controls.phones;
    ctrl.push(this.fb.group({
      area: ['', Validators.compose([Validators.required])],
      prefix: ['',Validators.compose([Validators.required])],      
      line: ['', Validators.required]
    }))
  }


  /* file upload code */
  onFileSelected(event){
     this.selectedFile = event.target.files[0];
  }

  onUpload(){
    //console.log(this.selectedFile);
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.heroService.uploadFile(fd)
        .subscribe(event => {  
           if(event.type === HttpEventType.UploadProgress){
               console.log("upload progress : " + Math.round(event.loaded / event.total* 100)  + "%");
           }else if(event.type === HttpEventType.Response){
             console.log(HttpEventType.Response);
           }
        });
  }

}
