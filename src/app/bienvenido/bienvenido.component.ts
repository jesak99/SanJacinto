import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Bienvenida } from '../model/bienvenida.model';
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
  integrantesGobierno !: Integrantes[];
  bienvenida !: Bienvenida;
  texto: string='';
  text:any;

  usuario$ = this.usuarioService.currentUserProfile$;
  pagina$ = this.paginaService.pagina$;
  principal$ = this.principalService.currentInformation$;
  banners$ = this.bannerService.banners$;
  integrantes$ = this.integranteService.integrantes$;
  pagina!:Pagina|null;

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
    })
    //this.text = document.getElementById("text");
    //this.texto=this.bienvenida.descripcion.replace(/\n/g,"<br>");
    //this.text!.innerText = this.texto;
  }

  ngAfterViewInit(){
    this.text = document.getElementById("text");
    this.paginaService.pagina$
    .pipe()
    .subscribe((pagina)=>{
      this.pagina = pagina;
      this.texto = pagina?.descripcion??'';
      this.text!.innerText = this.texto;
    })
  }

  openBanners(): void{
    const dialogRef = this.dialog.open(FormBannerComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openIntegrante(): void{
    this.dialog.open(FormIntegranteComponent,{});
  }

  openAjustes(pagina: Pagina): void{
    const dialogRef = this.dialog.open(FormBienvenidoComponent,{
      data:{
        titulo: pagina.nombre,
        descripcion: pagina.descripcion,
        imagen_bienvenida: pagina.fondoEncabezado,
        imagen_fondo: pagina.fondoPagina
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
