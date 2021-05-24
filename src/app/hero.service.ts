import { Injectable } from '@angular/core';
import { Hero } from './hero';
// import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// Injectble: 주입 가능한.. 주입 받을수도 있음.
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // heroes: create()함수안에 정의 해 놓은 데이터의 변수명
  // api: ?? 임의로 정한다.. memoryAPI를 이용했을때 그런듯?
  private heroesUrl = 'api/heroes'; // 웹 API 형식의 URL로 사용

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }
  constructor(private messageService : MessageService,
    private http : HttpClient
    ) {}

  // getHeroes(): Hero[]{
  //   return HEROES;
  // }

  // HEROES 데이터를 바로 리턴하는 것이 아니라, 비동기 처리를 하여 리턴함.
  // 비동기처리는 promise, observable, 등의 방식이 있음.
  getHeroes(): Observable<Hero[]>{
    this.messageService.add('HeroService: fetched horoes!');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_=>{this.log('fetched heroes')}),
        catchError(this.handleError<Hero[]>('getHeroes',[]))
      );
  }

  getHero(id: number): Observable<Hero> {
    // send message after getting hero's info
    // return of(HEROES[id]);

    // hero-detail이 아닌 서비스에 로직을 넣는 이유
    // : 후에 로직을 수정했을때 hero-detail은 영향을 받지 않는다.

    // this.messageService.add(`HeroService: hetched hero id = ${id}`);
    // return of(HEROES.find(hero=>hero.id === id));

    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url).pipe(
      tap(_ =>{this.log(`fetched hero id${id}`)}),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  private log (message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> =>{

      // TODO: send a message to Remote Server
      console.error(error);

      // TODO: translating to form that makes sense for users
      this.log(`${operation} failed: ${error.message}`);

      // return object that recieved as a default to prevent disconnecting app's logic
      return of(result as T);
    }
  }

  updateHero(hero:Hero): Observable<any> {
    // url에서.. 해당 hero 객체를.. put(업데이트 함수가 내장됨)
    return this.http.put(this.heroesUrl,hero,this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero:Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(
      // newHero는.. post가 반환하는 데이터인가?
      tap((newHero: Hero)=> this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    // url에서 id값을 추출해서 할당하는 로직이 있었나? 아니면 id 이름이 동일해서 자동으로 바인딩 되나?
    // url/:id 이걸 다시 봐야할듯.
    return this.http.delete<Hero>(url,this.httpOptions)
      .pipe(
        tap(_=>this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found heroes matching "${term}`) :
          this.log(`no heroes matching "${term}`),
        catchError(this.handleError<Hero[]>(`searchHeroes`,[]))        
        )
      )
  }
}
