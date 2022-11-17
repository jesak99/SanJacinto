import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Pagina } from 'src/app/model/pagina.model';
import { Publicacion } from 'src/app/model/publicacion.model';
import { PaginaService } from 'src/app/service/pagina.service';

@Component({
  selector: 'app-form-pagina',
  templateUrl: './form-pagina.component.html',
  styleUrls: ['./form-pagina.component.scss']
})
export class FormPaginaComponent implements OnInit {
  form !: FormGroup;
  publicaciones !: Publicacion[];

  constructor(
    public dialogRef: MatDialogRef<FormPaginaComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Pagina,
    private paginaService: PaginaService
  ) { }

  ngOnInit(): void {
    let id='';
    let nombre='';
    let descripcion='';
    let fondoEncabezado='';
    let fondoPagina='';

    if(this.data!=null){
      id=this.data.id;
      nombre=this.data.nombre;
      descripcion=this.data.descripcion;
      fondoEncabezado=this.data.fondoEncabezado;
      fondoPagina=this.data.fondoPagina;
    }

    this.form = new FormGroup({
      nombre : new FormControl(nombre, [Validators.required]),
      descripcion : new FormControl(descripcion),
      fondoEncabezado : new FormControl(fondoEncabezado, [Validators.required]),
      fondoPagina : new FormControl(fondoPagina)
    });

  }

  onSubmit(): void{
    const nombre = this.form.value.nombre;
    const descripcion = this.form.value.descripcion;
    const fondoEncabezado = this.form.value.fondoEncabezado;
    const fondoPagina = this.form.value.fondoPagina;

    const paginaUpdate = new Pagina(this.data.id, nombre, descripcion, fondoEncabezado, fondoPagina);
    this.paginaService.updatePagina(this.data.id, paginaUpdate);
  }

}
