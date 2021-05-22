import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES} from '../mock-heroes'
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  // heroes = HEROES;
  heroes!:Hero[];
  selectedHero!:Hero;
    

  constructor(private heroService : HeroService, private messageService : MessageService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero : Hero){
    this.selectedHero=hero;
    this.messageService.add(`HeroesComponenet : Selected hero id=${hero.id}`);
  }

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  // 구독하여 안에 있는 데이터를 뽑아서 할당.
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      (heroes)=>{
        this.heroes = heroes;
      }
    )
  }
}
