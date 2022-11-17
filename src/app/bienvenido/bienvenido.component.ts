import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Banner } from '../model/banner.model';
import { Bienvenida } from '../model/bienvenida.model';
import { Integrantes } from '../model/integrantes.model';
import { Principal } from '../model/principal.model';
import { BienvenidaService } from '../service/bienvenida.service';
import { PrincipalService } from '../service/principal.service';
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
  infoPrincipal !: Principal;
  banners !: Banner[];
  integrantesGobierno !: Integrantes[];
  bienvenida !: Bienvenida;
  text !: string;

  constructor(private principalService: PrincipalService, private bienvenidaService: BienvenidaService, public dialog: MatDialog) { }

  ngOnInit(): void {

    const text = document.getElementById("text");

    this.bienvenida = this.bienvenidaService.getBienvenida();
    this.bienvenidaService.newBienvenida.subscribe((bienvenida : Banner)=>{
      this.bienvenida = this.bienvenidaService.getBienvenida();
    });

    text!.innerText = this.bienvenida.descripcion;

    this.text=this.bienvenida.descripcion.replace(/\n/g,"<br>");

    this.infoPrincipal = this.principalService.getInfo();
    this.principalService.newInfo.subscribe((datosPrincipales : Principal)=>{
      this.infoPrincipal = this.principalService.getInfo();
    });

    this.banners = this.bienvenidaService.getBanners();
    this.bienvenidaService.newBienvenida.subscribe((banners : Banner)=>{
      this.banners = this.bienvenidaService.getBanners();
    });

    this.integrantesGobierno = this.bienvenidaService.getIntegrantes();
    this.bienvenidaService.newBienvenida.subscribe((integrantes : Integrantes)=>{
      this.integrantesGobierno = this.bienvenidaService.getIntegrantes();
    });
  }

  ngAfterViewInit(){
    
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

  openAjustes(): void{
    const dialogRef = this.dialog.open(FormBienvenidoComponent,{
      data:{
        titulo: this.bienvenida.titulo,
        descripcion: this.bienvenida.descripcion,
        imagen_bienvenida: this.bienvenida.imagen_bienvenida,
        imagen_fondo: this.bienvenida.imagen_fondo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
