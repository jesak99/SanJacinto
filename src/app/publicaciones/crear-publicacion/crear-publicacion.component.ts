import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Publicacion } from 'src/app/model/publicacion.model';
import { PublicacionService } from 'src/app/service/publicacion.service';
import { CardPublicacionComponent } from '../card-publicacion/card-publicacion.component';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.scss']
})
export class CrearPublicacionComponent implements OnInit {
  hide = false;
  value = '';
  opcionSelect : boolean = false;
  tipoPublicacion: string = '';

  //Formulario
  formPublicacion !: FormGroup;
  codigo: string="";
  editMode = false;

  constructor(
    public dialogRef: MatDialogRef<CardPublicacionComponent>, 
    @Inject(MAT_DIALOG_DATA) public publicacion: Publicacion,
    private publicacionService: PublicacionService
  ) { }

  ngOnInit(): void {
    let descripcion='';
    let fecha_pub='';
    let fecha_inicio='';
    let fecha_fin='';
    let tipo_pub='';
    let multimedia='';
    let pagina_id='';

    if(this.publicacion!=null){
      this.editMode = true;
      descripcion = this.publicacion.descripcion;
      fecha_pub = this.publicacion.fecha_pub.toString();
      fecha_inicio = this.publicacion.fecha_inicio.toString();
      fecha_fin = this.publicacion.fecha_fin.toString();
      tipo_pub = this.publicacion.tipo_pub;
      multimedia = this.publicacion.multimedia;
      pagina_id = this.publicacion.pagina_id;
    }

    this.formPublicacion = new FormGroup({
      descripcion : new FormControl(descripcion, ),
      fecha_pub : new FormControl(fecha_pub, ),
      fecha_inicio : new FormControl(fecha_inicio,),
      fecha_fin : new FormControl(fecha_fin, ),
      tipo_pub : new FormControl(tipo_pub, ),
      multimedia : new FormControl(multimedia,),
      pagina_id : new FormControl(pagina_id, Validators.required)
    });
  }

  cambiar(value:boolean){
    this.opcionSelect = value;
  }

  mostrar(value: string){
    this.tipoPublicacion = value;
  }

  onSubmit(){
    const descripcion = this.formPublicacion.value.descripcion;
    const fecha_pub = this.formPublicacion.value.fecha_pub;
    const fecha_inicio = this.formPublicacion.value.fecha_inicio;
    const fecha_fin = this.formPublicacion.value.fecha_fin;
    const tipo_pub = this.formPublicacion.value.tipo_pub;
    const multimedia = this.formPublicacion.value.multimedia;
    const pagina_id = this.formPublicacion.value.pagina_id;
    if(this.editMode){
      
    }else{
      const publicacion: Publicacion = new Publicacion(descripcion, fecha_pub, fecha_inicio, fecha_fin, tipo_pub, multimedia, "leyes-y-reglamentos");
      console.log(publicacion);
    } 
  }

}
