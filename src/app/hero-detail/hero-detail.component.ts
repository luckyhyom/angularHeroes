import { Component, Input, OnInit } from '@angular/core';
import {Hero} from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  // input대신 데이터를 파라미터로 받아서 쓸 수 는 없는걸까?
  @Input() hero!: Hero;

  @Input() str:any;

  constructor() { }

  ngOnInit(): void {
  }

}
