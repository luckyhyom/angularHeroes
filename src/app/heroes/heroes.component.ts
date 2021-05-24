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

  // onSelect(hero : Hero){
  //   this.selectedHero=hero;
  //   this.messageService.add(`HeroesComponenet : Selected hero id=${hero.id}`);
  // }

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

  add(name: string):void{

    name = name.trim();

    if (!name) {return;}

    // {name} 괄호안에 들어있는 이유는.. Hero라는 객체로써 들어가야하기 때문.
    // name이라는 프로퍼티가 Hero에 존재함으로.. 자동으로 바인딩 되는듯!
    // {name:name}.. 프로퍼티 네임이 같으므로 축약 가능.
    this.heroService.addHero({name} as Hero)
      // addHero가 문제없이 실행되면, 구독하여 새 히어로 객체를 받아옴.
      // (서버에서 어떤 객체를 보내줄지 알 수 없으므로
      // post가 서버로부터 반환한 데이터를 새로 받아온다.)
      .subscribe(hero => {

        // DB에 데이터를 저장하고, 화면 업데이트는 앵귤러에서 따로 한다.
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero):void {
    // filter: return array
    // find: return first value that matched from array
    // *데이터를 제거하는 기능은 HeroService가 담당하지만, 변경된 내용으로 화면을 갱신하는 것은 컴포넌트가 처리해야함
    this.heroes = this.heroes.filter((h)=> h !== hero);

    this.heroService.deleteHero(hero).subscribe();
  }
}
