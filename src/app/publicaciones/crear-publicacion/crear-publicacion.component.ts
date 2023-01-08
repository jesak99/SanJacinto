import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Publicacion, PublicacionTemporal } from 'src/app/model/publicacion.model';
import { PublicacionService } from 'src/app/service/publicacion.service';
import { CardPublicacionComponent } from '../card-publicacion/card-publicacion.component';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.scss']
})

export class CrearPublicacionComponent implements OnInit, AfterViewInit {
  id : string="";
  descripcion : string="";
  duracion : string="Indeterminado";
  fecha_pub : Date= new Date();
  fecha_inicio : Date | null= null;
  fecha_fin : Date | null=null;
  tipo_pub : string="Subir imagen/video desde dispositivo";
  formato : string="";
  multimedia : string="";
  oculto: boolean=false;
  pagina_id : string="";

  //Formulario
  formPublicacion !: FormGroup;
  editMode = false;

  url:any;
  format:any;
  file: any;

  duracionPublicacion: string[]=[
    "Indeterminado",
    "Periodo de tiempo"
  ];
  hide=false;

  tipoPublicacion: string[]=[
    "Subir imagen/video desde dispositivo",
    "Incluir imagen atraves de enlace",
    "Incluir video/publicación de una red social"
  ];

  constructor(
    public dialogRef: MatDialogRef<CardPublicacionComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Publicacion,
    private publicacionService: PublicacionService,
    private storage: Storage,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(this.data!=null){
      this.id = this.data.id;
      if(this.data.id!=""){
        this.editMode=true;
      }
      this.descripcion = this.data.descripcion;
      this.duracion = this.data.duracion;
      this.fecha_pub = this.data.fecha_pub;
      this.fecha_inicio = this.data.fecha_inicio;
      this.fecha_fin = this.data.fecha_fin;
      this.tipo_pub = this.data.tipo_pub;
      if(this.tipo_pub=="Subir imagen/video desde dispositivo" && this.editMode){
        this.url = this.data.multimedia;
        this.format = this.data.formato;
      }else{
        this.multimedia = this.data.multimedia;
      }
      this.oculto = this.data.oculto;
      this.pagina_id = this.data.pagina_id;
    };

    this.formPublicacion = new FormGroup({
      descripcion: new FormControl(this.descripcion),
      duracion: new FormControl(this.duracion),
      fecha_inicio: new FormControl(this.fecha_inicio),
      fecha_fin: new FormControl(this.fecha_fin),
      tipo: new FormControl(this.tipo_pub),
      multimedia: new FormControl(this.multimedia, [Validators.required]),
      oculto: new FormControl(this.oculto, [Validators.required])
    });

    this.ngAfterViewInit();
  }

  ngAfterViewInit(){
    if(this.duracion=="Periodo de tiempo"){
      this.formPublicacion = new FormGroup({
        descripcion: new FormControl(this.descripcion),
        duracion: new FormControl(this.duracion),
        fecha_inicio: new FormControl(this.fecha_inicio, [Validators.required]),
        fecha_fin: new FormControl(this.fecha_fin, [Validators.required]),
        tipo: new FormControl(this.tipo_pub),
        multimedia: new FormControl(this.multimedia, [Validators.required]),
        oculto: new FormControl(this.oculto, [Validators.required])
      });
    }else{
      this.formPublicacion = new FormGroup({
        descripcion: new FormControl(this.descripcion),
        duracion: new FormControl(this.duracion),
        fecha_inicio: new FormControl(this.fecha_inicio),
        fecha_fin: new FormControl(this.fecha_fin),
        tipo: new FormControl(this.tipo_pub),
        multimedia: new FormControl(this.multimedia, [Validators.required]),
        oculto: new FormControl(this.oculto, [Validators.required])
      });
    }
  }

  onSelectFile(event:any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.file=file;
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

  async onSubmit(){
    let descripcion = this.formPublicacion.value.descripcion;
    let fecha_pub;
    let fecha_inicio;
    let fecha_fin;
    let multimedia;
    let visibilidad=false;
    let pagina_id;
    let formato;

    if(this.duracion=="Indeterminado"){
      fecha_inicio = null;
      fecha_fin = null;
      visibilidad = this.hide;
    }else{
      fecha_inicio = this.formPublicacion.value.fecha_inicio;
      fecha_fin = this.formPublicacion.value.fecha_fin;
      visibilidad = false;
    }

    if(this.tipo_pub == "Subir imagen/video desde dispositivo"){
      const imgRef = ref(this.storage, 'publicaciones/' + this.file.name);
      await uploadBytes(imgRef, this.file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).catch(error=>console.log(error));
      await getDownloadURL(imgRef)
      .then((url) => {
          multimedia = url;
      })
      .catch((error) => {
          // Handle any errors
      });
      formato = this.format;
    }
    if(this.tipo_pub == "Incluir imagen atraves de enlace"){
      multimedia = this.formPublicacion.value.multimedia;
      formato = "image";
    }
    if(this.tipo_pub == "Incluir video/publicación de una red social"){
      multimedia = this.formPublicacion.value.multimedia;
      formato = "iframe"
    }



    if(this.editMode){
      
    }else{
      const pub: PublicacionTemporal = {
        id: "",
        descripcion: descripcion,
        duracion: this.duracion, 
        fecha_pub: new Date(), 
        fecha_inicio: fecha_inicio, 
        fecha_fin: fecha_fin, 
        tipo_pub: this.tipo_pub, 
        formato: formato, 
        multimedia: multimedia, 
        oculto: visibilidad, 
        pagina_id: this.pagina_id
      };
      await this.publicacionService.addPub(pub).then(response=>{
        this.snackBar.openFromComponent(AvisoComponent, {
          duration: 3000,
          data: {
            texto: "Publicacion exitosa",
            clase: "toast-success",
            icono: "check",
          },
        });
        this.dialogRef.close();
      }).catch(error=>{
        this.snackBar.openFromComponent(AvisoComponent, {
          duration: 3000,
          data: {
            texto: "Ha ocurrido un error :(",
            clase: "toast-error",
            icono: "error",
          },
        });
      })
      //const codigo = "PUB"+(this.publicacionService.getPublicaciones().length+1);
      //const publicacion: Publicacion = new Publicacion(codigo, descripcion, fecha_pub, fecha_inicio, fecha_fin, tipo_pub, multimedia, visibilidad,pagina_id);
      //console.log(publicacion);
      //this.publicacionService.agregarPublicacion(publicacion);
    } 
  }

  cambiarDuracion(duracion : string){
    this.duracion = duracion;
    this.ngAfterViewInit();
  }

  cambiarTipo(tipo: string){
    this.tipo_pub = tipo;
    this.url = "";
    this.format = "";
    this.file = "";
    this.ngAfterViewInit();
  }
}
