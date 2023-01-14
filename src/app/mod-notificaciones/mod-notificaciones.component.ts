import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionService } from '../service/notificacion.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-mod-notificaciones',
  templateUrl: './mod-notificaciones.component.html',
  styleUrls: ['./mod-notificaciones.component.scss']
})
export class ModNotificacionesComponent implements OnInit {

  constructor(
    private notificacionService: NotificacionService,
    private userService: UsuarioService,
    private router: Router
  ) {
    this.userService.currentUserProfile$
      .pipe()
      .subscribe((user) => {
        if(user?.rol!="Administrador"){
          this.router.navigate(["bienvenido"]);
        }
    });
  }

  ngOnInit(): void {}

}
