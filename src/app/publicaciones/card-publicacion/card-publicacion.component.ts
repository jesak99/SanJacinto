import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Publicacion } from 'src/app/model/publicacion.model';
import { PublicacionService } from 'src/app/service/publicacion.service';
import { CrearPublicacionComponent } from '../crear-publicacion/crear-publicacion.component';

@Component({
  selector: 'app-card-publicacion',
  templateUrl: './card-publicacion.component.html',
  styleUrls: ['./card-publicacion.component.scss']
})
export class CardPublicacionComponent implements OnInit, AfterViewInit {
  @Input() publicacion !: Publicacion;
  hide = false;
  texto = "Ocultar publicación";

  constructor(private publicacionService : PublicacionService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.hide = this.publicacion?.oculto;
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {
    if(this.publicacion.oculto){
      this.texto = "Mostrar publicación";
    }else{
      this.texto = "Ocultar publicación";
    }
    const box = document.getElementById('iframe');
    if(this.publicacion.formato==="iframe"){
      const el = document.createElement('div');
      el.innerHTML = this.publicacion.multimedia;
      box?.appendChild(el);
    }
  }

  openEditPublicacion(publicacion:Publicacion){
    const dialogRef = this.dialog.open(CrearPublicacionComponent, {
      data: {
        id: publicacion.id,
        descripcion: publicacion.descripcion,
        duracion: publicacion.duracion,
        fecha_pub: publicacion.fecha_pub,
        fecha_inicio: publicacion.fecha_inicio,
        fecha_fin: publicacion.fecha_fin,
        tipo_pub: publicacion.tipo_pub,
        formato: publicacion.formato,
        multimedia: publicacion.multimedia,
        oculto: publicacion.oculto,
        pagina_id: publicacion.pagina_id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

}
