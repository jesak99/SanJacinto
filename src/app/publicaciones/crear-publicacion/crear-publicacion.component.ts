import { Component, OnInit, Inject, Input } from '@angular/core';
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
  //Formulario
  formPublicacion !: FormGroup;
  codigo: string="";
  editMode = false;

  url:any;
  format:any;

  tipo_pub:string="foto";

  constructor(
    public dialogRef: MatDialogRef<CardPublicacionComponent>, 
    @Inject(MAT_DIALOG_DATA) public publicacion: Publicacion,
    private publicacionService: PublicacionService
  ) { }

  ngOnInit(): void {
    let descripcion='';
    let fecha_pub=new Date();
    let fecha_inicio=null;
    let fecha_fin=null;
    let multimedia='';
    let oculto=false;

    this.formPublicacion = new FormGroup({
      descripcion: new FormControl(descripcion),
      fecha_inicio: new FormControl(fecha_inicio),
      fecha_fin: new FormControl(fecha_fin),
      multimedia: new FormControl(multimedia)
    });
  }

  onSelectFile(event:any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }

  onSubmit(){
    const descripcion = this.formPublicacion.value.descripcion;
    const fecha_pub = this.formPublicacion.value.fecha_pub;
    const fecha_inicio = this.formPublicacion.value.fecha_inicio;
    const fecha_fin = this.formPublicacion.value.fecha_fin;
    const tipo_pub = this.formPublicacion.value.tipo_pub;
    const multimedia = this.formPublicacion.value.multimedia;
    const visibilidad = this.formPublicacion.value.visibilidad;
    const pagina_id = "leyes-y-reglamentos";
    if(this.editMode){
      
    }else{
      const codigo = "PUB"+(this.publicacionService.getPublicaciones().length+1);
      const publicacion: Publicacion = new Publicacion(codigo, descripcion, fecha_pub, fecha_inicio, fecha_fin, tipo_pub, multimedia, visibilidad,pagina_id);
      console.log(publicacion);
      this.publicacionService.agregarPublicacion(publicacion);
    } 
  }

}
