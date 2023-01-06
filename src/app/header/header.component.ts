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

  listaPaginas : Pagina[] = [];
  infoPrincipal?: Principal;

  @Input() tema?:boolean;

  usuario$: any = this.usuarioService.currentUserProfile$;
  currentInfo$ = this.principalService.currentInformation$;

  constructor(
    private paginas: PaginaService, 
    private principalService: PrincipalService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void{
    this.listaPaginas = this.paginas.getPaginas();
    this.paginas.listChangedEvent.subscribe((listOfCourses: Pagina[])=>{
      this.listaPaginas = this.paginas.getPaginas();
    });
    
    this.infoPrincipal = this.principalService.getInfoLocal();
    this.principalService.newInfo.subscribe((datosPrincipales : Principal)=>{
      this.infoPrincipal = this.principalService.getInfoLocal();
    });
    /**
    await this.principalService.getInfo().then(response => {
      if (response.exists()) {
        const tem = response.data();
        const infoTem = new Principal(
          tem.frase_izq,
          tem.frase_der,
          tem.frase_inf,
          tem.icono_enc,
          tem.icono_pri,
          tem.tema_pagi,
          tem.horario_1,
          tem.horario_2,
          tem.telefono1,
          tem.telefono2,
          tem.email1,
          tem.email2,
          tem.direccion,
          tem.direccion_link,
          tem.facebook,
          tem.facebook_link,
          tem.twitter,
          tem.twitter_link,
          tem.instagram,
          tem.instagram_link,
          tem.youtube,
          tem.youtube_link
        );
        this.infoPrincipal=infoTem;
      } else {
        console.log("No existen datos")
      }
    }).catch(error => console.log(error)); */

    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.infoPrincipal = this.principalService.getInfoLocal();
    this.principalService.newInfo.subscribe((datosPrincipales : Principal)=>{
      this.infoPrincipal = this.principalService.getInfoLocal();
    });
    /**
    await this.principalService.getInfo().then(response => {
      if (response.exists()) {
        const tem = response.data();
        const infoTem = new Principal(
          tem.frase_izq,
          tem.frase_der,
          tem.frase_inf,
          tem.icono_enc,
          tem.icono_pri,
          tem.tema_pagi,
          tem.horario_1,
          tem.horario_2,
          tem.telefono1,
          tem.telefono2,
          tem.email1,
          tem.email2,
          tem.direccion,
          tem.direccion_link,
          tem.facebook,
          tem.facebook_link,
          tem.twitter,
          tem.twitter_link,
          tem.instagram,
          tem.instagram_link,
          tem.youtube,
          tem.youtube_link
        );
        this.infoPrincipal=infoTem;
      } else {
        console.log("No existen datos")
      }
    }).catch(error => console.log(error));*/
  }

}
