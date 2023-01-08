import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { Pagina } from '../model/pagina.model';
import { PaginaService } from '../service/pagina.service';
import { Publicacion } from '../model/publicacion.model';
import { PublicacionService } from '../service/publicacion.service';
import { FormPaginaComponent } from './form-pagina/form-pagina.component';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})

@Injectable()
export class PublicacionesComponent implements OnInit {
  @Input() pagina2?: Pagina;
  @Input() id: string='';

  usuario$ = this.usuarioService.currentUserProfile$;
  pagina$ = this.paginas.getPag$;
  publicaciones$ = this.publicaciones.publicaciones$;


  listPublicaciones : Publicacion[]=[];

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute, 
    private paginas: PaginaService,
    private publicaciones: PublicacionService,
    private usuarioService: UsuarioService) { }

  ngOnInit(){
    this.route.params.subscribe((params: Params)=>{
      if(params['id']){
        this.id=params['id'];
        this.paginas.setPagina(params['id']);
        this.publicaciones.setPagina(params['id']);
        this.pagina$ = this.paginas.getPag$;
        this.publicaciones$ = this.publicaciones.publicaciones$;
      }
    });
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
        pagina_id : this.id
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  openEditarPagina(pagina: Pagina): void {
    const dialogRef = this.dialog.open(FormPaginaComponent, {
      data: {
        id: pagina.id,
        nombre: pagina.nombre, 
        descripcion: pagina.descripcion, 
        fondoEncabezado: pagina.fondoEncabezado,
        fondoPagina: pagina.fondoPagina
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}
