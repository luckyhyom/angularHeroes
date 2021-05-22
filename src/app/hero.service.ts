import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

// Injectble: 주입 가능한.. 주입 받을수도 있음.
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService : MessageService) {

  }

  // getHeroes(): Hero[]{
  //   return HEROES;
  // }

  // HEROES 데이터를 바로 리턴하는 것이 아니라, 비동기 처리를 하여 리턴함.
  // 비동기처리는 promise, observable, 등의 방식이 있음.
  getHeroes(): Observable<Hero[]>{
    this.messageService.add('HeroService: fetched horoes!');
    return of(HEROES);
  }
}
