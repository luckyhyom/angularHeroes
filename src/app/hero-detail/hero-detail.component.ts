import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Hero} from '../hero';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  // input대신 데이터를 파라미터로 받아서 쓸 수 는 없는걸까?
  // -> 쌉가능

  // @Input() hero!: Hero;
  hero!: Hero;

  // @Input() str:any;

  constructor(
    private route:ActivatedRoute,
    private heroService:HeroService,
    private location : Location
  ) {}

  ngOnInit(): void {

    console.log(this.route.paramMap);
    console.log(this.route.snapshot);

    
    // this.route.paramMap.subscribe(
    //   (param)=>{
    //     console.log(param.get('id'));
    //     console.log(param.keys);
        
    //     this.heroService.getHeroes().subscribe((heroes)=>{
    //       // int로 받는 법?
    //       // -> Number(string);
    //       this.hero=heroes[Number(param.get('id'))];
    //     })
    //   }
    // )

    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe( hero => this.hero = hero);
  }

  goBack(){
    this.location.back();
  }

  save(){
    this.heroService.updateHero(this.hero)
      .subscribe(()=>this.goBack());
  }



}
