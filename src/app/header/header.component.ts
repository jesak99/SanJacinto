import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Pagina } from '../model/pagina.model';
import { Principal } from '../model/principal.model';
import { PaginaService } from '../service/pagina.service';
import { PrincipalService } from '../service/principal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, AfterViewInit {

  listaPaginas : Pagina[] = [];
  infoPrincipal !: Principal;

  @Input() tema?:boolean;

  constructor(
    private paginas: PaginaService, 
    private principalService: PrincipalService
  ) { }

  ngOnInit(): void {
    this.listaPaginas = this.paginas.getPaginas();
    this.paginas.listChangedEvent.subscribe((listOfCourses: Pagina[])=>{
      this.listaPaginas = this.paginas.getPaginas();
    });
    this.infoPrincipal = this.principalService.getInfo();
    this.principalService.newInfo.subscribe((datosPrincipales : Principal)=>{
      this.infoPrincipal = this.principalService.getInfo();
    });
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.infoPrincipal = this.principalService.getInfo();
    this.principalService.newInfo.subscribe((datosPrincipales : Principal)=>{
      this.infoPrincipal = this.principalService.getInfo();
    });
  }

}
