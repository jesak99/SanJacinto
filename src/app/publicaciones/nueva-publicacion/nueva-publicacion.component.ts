import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { CrearPublicacionComponent } from '../crear-publicacion/crear-publicacion.component';


@Component({
  selector: 'app-nueva-publicacion',
  templateUrl: './nueva-publicacion.component.html',
  styleUrls: ['./nueva-publicacion.component.scss']
})
export class NuevaPublicacionComponent implements OnInit {
  id:string="";

  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      if(params['id']){
        this.id=params['id'];
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearPublicacionComponent, {
      data: {
        id : "",
        descripcion : "",
        duracion: "Indeterminado",
        fecha_pub : new Date(),
        fecha_inicio : null,
        fecha_fin : null,
        tipo_pub : "Subir imagen/video desde dispositivo",
        formato : "",
        multimedia : "",
        oculto: false,
        pagina_id : this.id
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openDialogImg(): void{
    const dialogRef = this.dialog.open(CrearPublicacionComponent, {
      data: {
        id : "",
        descripcion : "",
        duracion: "Indeterminado",
        fecha_pub : new Date(),
        fecha_inicio : null,
        fecha_fin : null,
        tipo_pub : "Incluir imagen atraves de enlace",
        formato : "image",
        multimedia : "",
        oculto: false,
        pagina_id : this.id
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openDialogFrame():void{
    const dialogRef = this.dialog.open(CrearPublicacionComponent, {
      data: {
        id : "",
        descripcion : "",
        duracion: "Indeterminado",
        fecha_pub : new Date(),
        fecha_inicio : null,
        fecha_fin : null,
        tipo_pub : "Incluir video/publicación de una red social",
        formato : "iframe",
        multimedia : "",
        oculto: false,
        pagina_id : this.id
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
