import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @HostListener('window:scroll',['$event'])
  estilo: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onWindowScroll() {
    if(document.body.scrollTop>0 || document.documentElement.scrollTop>0){
      this.estilo=true;
    }else{
      this.estilo=false;
    }
  }

}
