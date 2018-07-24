import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
//import { HEROES } from '../mock-heroes';  // no need if we use hero service
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

	/* 
    Hero = {
  		id : 11,
  		name : 'Mr. Nice'
  	};
  */

  //heroes = HEROES;
  heroes: Hero[];   


	selectedHero : Hero;

  constructor(private heroSerivce: HeroService) { }

	ngOnInit() {
		//console.log(this.selectedHero);
    this.getHeroes();

	}

	onSelect(hero: Hero): void {
  	this.selectedHero = hero;
  	console.log(this.selectedHero);
	}


  //defined service for get heroes from service using simple way
    /*
    getHeroes(): void{
      this.heroes = this.heroSerivce.getHeroes();
    }
    */

  //defined service for get heroes from service using Observable
    getHeroes(): void{
      this.heroSerivce.getHeroes().subscribe(heroes => this.heroes = heroes)
    } 

}
