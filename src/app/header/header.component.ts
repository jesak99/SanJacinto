import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Pagina } from '../model/pagina.model';
import { Principal } from '../model/principal.model';
import { PaginaService } from '../service/pagina.service';
import { PrincipalService } from '../service/principal.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() tema?:boolean;

  usuario$: any = this.usuarioService.currentUserProfile$;

  paginasS!:Pagina[]|null;
  info!:Principal|null;

  constructor(
    private paginas: PaginaService, 
    private principalService: PrincipalService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void{
    this.principalService.currentInformation$
    .pipe()
    .subscribe((info)=>{
      this.info = info;
    });

    this.paginas.allPaginas$
    .pipe()
    .subscribe((paginas)=>{
      this.paginasS = paginas;
    });
  }

  ngAfterViewInit() {}

}
