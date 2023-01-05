import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../service/notificacion.service';

@Component({
  selector: 'app-mod-notificaciones',
  templateUrl: './mod-notificaciones.component.html',
  styleUrls: ['./mod-notificaciones.component.scss']
})
export class ModNotificacionesComponent implements OnInit {

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.notificacionService.requestPermission();
    this.notificacionService.listen();
    this.notificacionService.receiveMessage();
  }

}
