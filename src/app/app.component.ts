import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Principal } from './model/principal.model';
import { PrincipalService } from './service/principal.service';
import { UsuarioService } from './service/usuario.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';
import { Usuario } from './model/usuario.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SanJacinto';
  infoPrincipal: Principal = new Principal('','','','','',false,'','','','','','','','','','','','','','','','');
  usuario ?: Usuario;

  header_variable = false;

  constructor(
    private principalService: PrincipalService, 
    private usuarioService: UsuarioService, 
    private router: Router, 
    private snackBar: MatSnackBar
  ){}

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

    this.usuario = this.usuarioService.getInfoUser();
    this.usuarioService.usuarioInfo.subscribe((usuarioInfo:Usuario)=>{
      this.usuario = this.usuarioService.getInfoUser();
    })
  }

  logout(){
    this.usuarioService.logout()
    .then(()=>{
      const userTem = new Usuario('',null,null,null,null);
      this.usuarioService.setUser(userTem);
      this.snackBar.openFromComponent(AvisoComponent, {
        duration: 3000,
        data: "Se ha cerrado la sesión",
      });
      this.router.navigate(['/bienvenido'])
    })
    .catch(error=>console.log(error));
  }
}
