import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from 	'@angular/router';
import { Location } from '@angular/common';
 
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { User } from '../user_object';


@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})

export class HeroDetailsComponent implements OnInit {
	
  @Input() hero: Hero;

  user : any = {};

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }

  ngOnInit(): void{
 
  	this.getHero();
  }

  getHero(): void{
  	const id = this.route.snapshot.paramMap.get("id");
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
      
  };

  updateUser(id : string) : void {
      this.user = this.hero;
      this.heroService.updateUser(this.user, id)
                      .subscribe(data =>  {this.goBack()});
  };

  goBack(): void{
  	this.location.back();
  }

}
