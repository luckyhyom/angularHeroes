import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      // id.. 초기화한 값을 인식해서 자동으로 아이디가 할당되었던 것 같다.
      { id: 11, name: 'Dr Nice'},
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ]
    return {heroes};
  }

  getId(heroes: Hero[]): number{
    console.log('hero.map',...heroes.map(hero => hero.id));
    
    return heroes.length > 0 ? Math.max(
      // hero의 id로 배열을 생성, 그 중 가장 큰 값을 리턴
      ...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
