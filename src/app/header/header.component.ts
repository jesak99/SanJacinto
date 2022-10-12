import { Component, OnInit, HostListener } from '@angular/core';
import { Pagina } from '../model/pagina.model';
import { PaginaService } from '../service/pagina.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @HostListener('window:scroll',['$event'])
  estilo: boolean = false;
  listaPaginas : Pagina[] = [];

  constructor(private paginas: PaginaService) { }

  ngOnInit(): void {
    this.listaPaginas = this.paginas.getPaginas();
    this.paginas.listChangedEvent.subscribe((listOfCourses: Pagina[])=>{
      this.listaPaginas = this.paginas.getPaginas();
    })
  }

  onWindowScroll() {
    if(document.body.scrollTop>0 || document.documentElement.scrollTop>0){
      this.estilo=true;
    }else{
      this.estilo=false;
    }
  }

}
