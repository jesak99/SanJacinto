import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { Pagina } from '../model/pagina.model';
import { PaginaService } from '../service/pagina.service';
import { Publicacion } from '../model/publicacion.model';
import { PublicacionService } from '../service/publicacion.service';
import { FormPaginaComponent } from './form-pagina/form-pagina.component';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})

@Injectable()
export class PublicacionesComponent implements OnInit {
  @Input() pagina?: Pagina;
  @Input() id: string='';

  listPublicaciones : Publicacion[]=[];

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute, 
    private paginas: PaginaService,
    private publicaciones: PublicacionService) { }

  async ngOnInit(){
    this.route.params.subscribe((params: Params)=>{
      if(params['id']){
        this.id=params['id'];
        this.pagina = this.paginas.getPagina(this.id);
      }
    });

    await this.publicaciones.getPublicacionesDB().then(response=>{
      response.forEach((doc) => {
        if (doc.exists()) {
          var pub = new Publicacion(
            doc.id,
            doc.data().descripcion,
            doc.data().duracion,
            new Date(),
            doc.data().fecha_inicio,
            doc.data().fecha_fin,
            doc.data().tipo_pub,
            doc.data().formato,
            doc.data().multimedia,
            doc.data().oculto,
            doc.data().pagina_id
          );
          this.listPublicaciones?.push(pub);
        } else {
          console.log("No such document!");
        }
      });
      }).catch(error=>console.log(error));
  }

  openCrearPublicacion(): void {
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
        pagina_id : this.pagina?.id
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openEditarPagina(): void {
    const dialogRef = this.dialog.open(FormPaginaComponent, {
      data: {
        id: this.pagina?.id,
        nombre: this.pagina?.nombre, 
        descripcion: this.pagina?.descripcion, 
        fondoEncabezado: this.pagina?.fondoEncabezado,
        fondoPagina: this.pagina?.fondoPagina
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
