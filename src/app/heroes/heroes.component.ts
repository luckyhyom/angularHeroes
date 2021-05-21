import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES} from '../mock-heroes'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes = HEROES;

  selectedHero:any;
    

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(hero : Hero){
    // if(this.selectedHero.includes(hero)){
    //   return;
    // }
    // this.selectedHero.push(hero);
    this.selectedHero=hero;
  }

}
