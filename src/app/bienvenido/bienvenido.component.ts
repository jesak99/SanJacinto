import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Banner } from '../model/banner.model';
import { Integrantes } from '../model/integrantes.model';
import { Pagina } from '../model/pagina.model';
import { Principal } from '../model/principal.model';
import { BannerService } from '../service/banner.service';
import { IntegranteService } from '../service/integrantes.service';
import { PaginaService } from '../service/pagina.service';
import { PrincipalService } from '../service/principal.service';
import { UsuarioService } from '../service/usuario.service';
import { FormBannerComponent } from './form-banner/form-banner.component';
import { FormBienvenidoComponent } from './form-bienvenido/form-bienvenido.component';
import { FormIntegranteComponent } from './form-integrante/form-integrante.component';

export interface Destacado {
  index: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  colorFondo: string;
  class: string;
}

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent implements OnInit, AfterViewInit {
  texto: string='';
  text:any;

  usuario$ = this.usuarioService.currentUserProfile$;

  pagina!:Pagina|null;
  infoPrincipal!:Principal|null;
  banners!:Banner[]|null;
  integrantesGobierno !: Integrantes[]|null;

  constructor(
    private principalService: PrincipalService,
    private bannerService: BannerService,
    private integranteService: IntegranteService,
    private paginaService: PaginaService,
    public usuarioService: UsuarioService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void{
    this.text = document.getElementById("text");
    this.paginaService.pagina$
    .pipe()
    .subscribe((pagina)=>{
      this.pagina = pagina;
      this.texto = pagina?.descripcion??'';
      this.text!.innerText = this.texto;
    });

    this.bannerService.banners$
    .pipe()
    .subscribe((banners)=>{
      this.banners = banners;
    });

    this.principalService.currentInformation$
    .pipe()
    .subscribe((info)=>{
      this.infoPrincipal = info;
    });

    this.integranteService.integrantes$
    .pipe()
    .subscribe((integrantes)=>{
      this.integrantesGobierno = integrantes;
    });
  }

  ngAfterViewInit(){}

  openBanners(): void{
    const dialogRef = this.dialog.open(FormBannerComponent,{
      data:{
        data: this.banners
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openIntegrante(): void{
    this.dialog.open(FormIntegranteComponent,{});
  }

  openAjustes(): void{
    const dialogRef = this.dialog.open(FormBienvenidoComponent,{
      data:{
        titulo: this.pagina?.nombre,
        descripcion: this.pagina?.descripcion,
        imagen_bienvenida: this.pagina?.fondoEncabezado,
        imagen_fondo: this.pagina?.fondoPagina
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
