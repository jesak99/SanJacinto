import { Component } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { Solicitud } from '../model/solicitud';
import { SolicitudService } from '../service/solicitud.service';
import { UsuarioService } from '../service/usuario.service';
import { CardSolicitudComponent } from './card-solicitud/card-solicitud.component';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent {
  solicitudesPendientes$ = this.solicitudService.allSolicitudesPendientes$;
  solicitudesAtendidas$ = this.solicitudService.allSolicitudesAtendidas$;

  constructor(
    private solicitudService: SolicitudService, 
    public dialog: MatDialog,
    private userService: UsuarioService,
    private router: Router
  ){
    this.userService.currentUserProfile$
      .pipe()
      .subscribe((user) => {
        if(user?.rol!="Administrador"){
          this.router.navigate(["bienvenido"]);
        }
    });
  }

  openInfo(solicitud: Solicitud): void{
    const dialogRef = this.dialog.open(CardSolicitudComponent,{
      data:{
        id: solicitud.id,
        fecha: solicitud.fecha,
        asunto: solicitud.asunto, 
        nombre: solicitud.nombre, 
        apellidoPaterno: solicitud.apellidoPaterno, 
        apellidoMaterno: solicitud.apellidoMaterno, 
        calle: solicitud.calle, 
        numExterior: solicitud.numExterior, 
        numInterior: solicitud.numInterior, 
        colonia: solicitud.colonia, 
        telefono: solicitud.telefono, 
        email: solicitud.email, 
        solicitud: solicitud.solicitud, 
        estado: solicitud.estado, 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}
