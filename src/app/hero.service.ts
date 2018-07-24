import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpProgressEvent } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user_object';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { MessageService } from './message.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})


export class HeroService {
	
	// using simple way
	/*
		getHeroes(): Hero[] {
			return HEROES
		}
	*/

	// using obeservable way
	getHeroes(): Observable<Hero[]> {
		
		this.messageService.add("heroService: fetched heroes");			
		return this.http.get<Hero[]>("http://localhost:3000/users/getAllUsersUsingMongooseModel?token="+localStorage.getItem("token"));
		//return of(HEROES);
	}


	//get hero details service
	getHero(id: string): Observable<Hero>{

		this.messageService.add(`HeroDetailsService: fetched Hero id=${id}`);
		
		//return this.http.get<Hero>("http://jsonplaceholder.typicode.com/users?id="+id);
		return this.http.get<Hero>("http://localhost:3000/users/getUserDetailsUsingMonooseModel/"+id+"?token="+localStorage.getItem("token"));

		//return of(HEROES.find(hero => hero.id === id));
	}


	// post method test
	createUser(user: User): Observable<User>{	
		return this.http.post<User>("http://localhost:3000/users/addUserUsingMongooseModel?token="+localStorage.getItem("token"),user, httpOptions)
		.pipe(tap((	user: User) => console.log('added user')),
      	catchError(this.handleError<User>('addUser'))
    	);
	}

	updateUser(user: User, id: string): Observable<User>{

		console.log("service file ---->", user);
		console.log("service file me id ---->", id);

		return this.http.post("http://localhost:3000/users/updateUserUsingMongooseModel/"+id+"?token="+localStorage.getItem("token"), user, httpOptions)
		.pipe(tap((	user: User) => console.log('user updated')),
      	catchError(this.handleError<User>('user updated'))
    	);
	}


	/* file upload */

	uploadFile(data){
		console.log(data);
		return this.http.post("http://localhost:3000/login/uploadFile",data, {
			reportProgress: true,
			observe : 'events'
		});
	}

  	constructor(private http: HttpClient, private messageService: MessageService) { }


  	private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
	      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}
