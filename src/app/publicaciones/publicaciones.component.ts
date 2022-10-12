import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { Pagina } from '../model/pagina.model';
import { PaginaService } from '../service/pagina.service';
import { Publicacion } from '../model/publicacion.model';
import { PublicacionService } from '../service/publicacion.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
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

  openDialog(): void {
    this.dialog.open(CrearPublicacionComponent, {});
  }

}
