import { AfterViewInit, Component, HostListener, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Principal } from './model/principal.model';
import { PrincipalService } from './service/principal.service';
import { UsuarioService } from './service/usuario.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';
import { Usuario } from './model/usuario.model';
import { AuthService } from './service/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastService } from './service/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{

  @ViewChild('top') top!: ElementRef;

  title = 'SanJacinto';
  infoPrincipal: Principal = new Principal('','','','','',false,'','','','','','','','','','','','','','','','');
  usuario$ = this.usuarioService.currentUserProfile$;
  currentInfo$ = this.principalService.currentInformation$;

  header_variable = false;

  constructor(
    private principalService: PrincipalService,
    private usuarioService: UsuarioService,
    private auth: AuthService,
    private router: Router,
    private toast: HotToastService,
    private snackBar: MatSnackBar,
    public toastService: ToastService
  ){}

  ngAfterViewInit(): void {
    this.scrollToTop();
  }

  async ngOnInit(){
    /**
    this.infoPrincipal = this.principalService.getInfo();
    this.principalService.newInfo.subscribe((datosPrincipales : Principal)=>{
      this.infoPrincipal = this.principalService.getInfo();
    });
     */
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
        this.principalService.setInfo(infoTem);
      } else {
        console.log("No existen datos")
      }
    }).catch(error => console.log(error));

    this.infoPrincipal = this.principalService.getInfoLocal();
    this.principalService.newInfo.subscribe((datosPrincipales : Principal)=>{
      this.infoPrincipal = this.principalService.getInfoLocal();
    });

    /*
    this.usuario = this.usuarioService.getInfoUser();
    this.usuarioService.usuarioInfo.subscribe((usuarioInfo:Usuario)=>{
      this.usuario = this.usuarioService.getInfoUser();
    })*/
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

  scrollToTop(){
    setTimeout(() => {
      if(this.top){
        this.top.nativeElement.scrollIntoView({behavior: 'smooth'})
      }
    }, 100);
  }
}
