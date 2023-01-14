import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit{
  show:boolean=false;

  constructor(private router_ : Router){
    this.router_.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.show = true;
      }else if(event instanceof NavigationEnd){
        this.show = false;
      }
    })
  }

  ngOnInit(): void {
    this.router_.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.show = true;
      }else if(event instanceof NavigationEnd){
        this.show = false;
      }
    })
  }

}
