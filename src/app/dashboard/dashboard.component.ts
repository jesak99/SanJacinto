import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UsuarioService } from '../service/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AvisoComponent } from 'src/app/aviso/aviso.component';
import { SolicitudService } from '../service/solicitud.service';
import { PaginaService } from '../service/pagina.service';
import { BannerService } from '../service/banner.service';
import { IntegranteService } from '../service/integrantes.service';

export interface CardData {
  imageId: string;
  state: 'default' | 'flipped' | 'matched';
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  user$ = this.userService.currentUserProfile$;

  userAct: number = 0;
  userDel: number = 0;
  adminis: number = 0;
  habitan: number = 0;
  adminDel: number = 0;
  habitDel: number = 0;
  atendidas: number = 0;
  pendientes: number = 0;
  casaCultura: number = 0;
  comunicacion: number = 0;
  leyes: number = 0;
  seguridad: number = 0;
  publicaciones: number = 0;
  banners: number = 0;
  integrantes: number = 0;

  constructor(
    private userService: UsuarioService,
    private solicitudService: SolicitudService,
    private paginaService: PaginaService,
    private bannerService: BannerService,
    private integranteService: IntegranteService,
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) { 
    this.userService.currentUserProfile$
      .pipe()
      .subscribe((user) => {
        if(user?.rol!="Administrador"){
          this.router.navigate(["bienvenido"]);
        }
    });
  }

  async ngOnInit() {
    await this.userService.usuariosActivos().then(response=>{
      this.userAct = response.data().count;
    });
    await this.userService.usuariosEliminados().then(response=>{
      this.userDel = response.data().count;
    });
    await this.userService.usuariosAdmin().then(response=>{
      this.adminis = response.data().count;
    });
    await this.userService.usuariosHabi().then(response=>{
      this.habitan = response.data().count;
    });
    await this.userService.usuariosAdminDel().then(response=>{
      this.adminDel = response.data().count;
    });
    await this.userService.usuariosHabiDel().then(response=>{
      this.habitDel = response.data().count;
    });
    await this.solicitudService.solicitudesAtendidas().then(response=>{
      this.atendidas = response.data().count;
    });
    await this.solicitudService.solicitudesPendientes().then(response=>{
      this.pendientes = response.data().count;
    });
    await this.paginaService.casaCultura().then(response=>{
      this.casaCultura = response.data().count;
    });
    await this.paginaService.comunicacion().then(response=>{
      this.comunicacion = response.data().count;
    });
    await this.paginaService.leyes().then(response=>{
      this.leyes = response.data().count;
    });
    await this.paginaService.seguridad().then(response=>{
      this.seguridad = response.data().count;
    });
    await this.paginaService.publicaciones().then(response=>{
      this.publicaciones = response.data().count;
    });
    await this.bannerService.getCantidadBanners().then(response=>{
      this.banners = response.data().count;
    });
    await this.bannerService.getCantidadBanners().then(response=>{
      this.banners = response.data().count;
    });
    await this.integranteService.cantidadIntegrantes().then(response=>{
      this.integrantes = response.data().count;
    });
  }

  logout(){
    this.auth.logout().subscribe(() => {
      this.snackBar.openFromComponent(AvisoComponent, {
        duration: 3000,
        data: {
          texto: "Se ha cerrado la sesión",
          clase: "toast-warning",
          icono: "info",
        },
      });
      this.router.navigate(['bienvenido']);
    });
  }

  navegar(link: string){
    this.router.navigate([link]);
  }

}
