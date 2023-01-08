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
  currentInfo$ = this.principalService.currentInformation$;
  paginas$ = this.paginas.allPaginas$;

  constructor(
    private paginas: PaginaService, 
    private principalService: PrincipalService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void{}

  ngAfterViewInit() {}

}
