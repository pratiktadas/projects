import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Token } from './token';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

var token = {};

@Injectable({
  providedIn: 'root'
})

export class LoginService {

	login(data) : Observable<Token>{

		//console.log(data);

	  	return this.http.post("http://localhost:3000/login", data , httpOptions)
	  					        .pipe( 
                            tap( (	token: Token) => console.log(token) )//,
                            //catchError(this.handleError<Token>('login successfull'))
                           );
  	}

  	constructor(private http : HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console in
      
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
       
	      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  /*private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }*/
}
