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
  hide = false;
  value = '';
  opcionSelect : boolean = false;
  tipoPublicacion: string = '';

  //Controlador de opciones
  selectedIndex: number=0;

  selectedFoto: boolean=false;
  selectedVideo: boolean=false;
  selectedFotoSrc: boolean=false;
  selectedIframe: boolean=false;

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
    let oculto=false;

    if(this.publicacion!=null){
      this.editMode = true;
      descripcion = this.publicacion.descripcion;
      fecha_pub = this.publicacion.fecha_pub.toString();
      fecha_inicio = this.publicacion.fecha_inicio.toString();
      fecha_fin = this.publicacion.fecha_fin.toString();
      tipo_pub = this.publicacion.tipo_pub;
      multimedia = this.publicacion.multimedia;
      this.hide = this.publicacion.oculto;

      if(this.publicacion.tipo_pub=='foto-src'||this.publicacion.tipo_pub=='iframe')
        this.selectedIndex = 1;
      
      if(this.publicacion.tipo_pub=='foto'){
        this.selectedFoto=true;
        this.mostrar('foto');
      }
      if(this.publicacion.tipo_pub=='video'){
        this.selectedVideo=true;
        this.mostrar('video');
      }
      if(this.publicacion.tipo_pub=='foto-src'){
        this.selectedFotoSrc=true; 
        this.mostrar('foto-src');
      }
      if(this.publicacion.tipo_pub=='iframe'){
        this.selectedIframe=true;
        this.mostrar('iframe');
      }
    }

    this.formPublicacion = new FormGroup({
      descripcion : new FormControl(descripcion, ),
      fecha_pub : new FormControl(fecha_pub, ),
      fecha_inicio : new FormControl(fecha_inicio,),
      fecha_fin : new FormControl(fecha_fin, ),
      tipo_pub : new FormControl(tipo_pub, ),
      multimedia : new FormControl(multimedia, [Validators.required]),
      oculto : new FormControl(this.hide,)
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
      const publicacion: Publicacion = new Publicacion(descripcion, fecha_pub, fecha_inicio, fecha_fin, tipo_pub, multimedia, this.hide,"leyes-y-reglamentos");
      console.log(publicacion);
      this.publicacionService.agregarPublicacion(publicacion);
    } 
  }

}
