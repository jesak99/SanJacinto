import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Principal } from './model/principal.model';
import { PrincipalService } from './service/principal.service';
import { UsuarioService } from './service/usuario.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';
import { AuthService } from './service/auth.service';
import { ToastService } from './service/toast.service';
import { NotificacionService } from './service/notificacion.service';

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
    private snackBar: MatSnackBar,
    public toastService: ToastService,
    private notificacionService: NotificacionService
  ){}

  ngAfterViewInit(): void {
    this.scrollToTop();
  }

  async ngOnInit(){
    this.usuarioService.currentUserProfile$
    .pipe()
    .subscribe((usuario)=>{
      if(usuario){
        this.notificacionService.requestPermission();
        this.notificacionService.listen();
        this.notificacionService.receiveMessage();
      }
    })
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
