import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      if(params['id']){
        this.id=params['id'];
        this.pagina = this.paginas.getPagina(this.id);
      }
    });
    this.listPublicaciones = this.publicaciones.getPublicaciones();
    this.publicaciones.listChangedEvent.subscribe((listOfPublicaciones: Publicacion[])=>{
      this.listPublicaciones = this.publicaciones.getPublicaciones();
    });
  }

  openCrearPublicacion(): void {
    this.dialog.open(CrearPublicacionComponent, {});
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
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

}
