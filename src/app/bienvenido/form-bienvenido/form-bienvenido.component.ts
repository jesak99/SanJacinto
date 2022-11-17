import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bienvenida } from 'src/app/model/bienvenida.model';
import { BienvenidaService } from 'src/app/service/bienvenida.service';

@Component({
  selector: 'app-form-bienvenido',
  templateUrl: './form-bienvenido.component.html',
  styleUrls: ['./form-bienvenido.component.scss']
})
export class FormBienvenidoComponent implements OnInit {
  public imagePath?:string;
  imgURL: any;
  public message?: string;

  public imagePath2?:string;
  imgURL2: any;
  public message2?: string;

  form !: FormGroup;

  editMode = false;

  constructor(
    public dialogRef: MatDialogRef<FormBienvenidoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Bienvenida,
    private bienvenidaService:BienvenidaService
  ) { }

  ngOnInit(): void {
    let titulo='';
    let descripcion='';
    let imagen_bienvenida='';
    let imagen_fondo='';

    if(this.data!=null){
      this.editMode=true;
      titulo=this.data.titulo;
      descripcion=this.data.descripcion;
      this.imgURL = this.data.imagen_bienvenida;
      this.imgURL2 = this.data.imagen_fondo;
    }

    this.form = new FormGroup({
      titulo : new FormControl(titulo, [Validators.required]),
      descripcion : new FormControl(descripcion, [Validators.required]),
      imagen_bienvenida : new FormControl(imagen_bienvenida),
      imagen_fondo : new FormControl(imagen_fondo)
    });
  }

  preview(files:any) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  preview2(files:any) {
    if (files.length === 0)
      return;
 
    var mimeType2 = files[0].type;
    if (mimeType2.match(/image\/*/) == null) {
      this.message2 = "Only images are supported.";
      return;
    }
 
    var reader2 = new FileReader();
    this.imagePath2 = files;
    reader2.readAsDataURL(files[0]); 
    reader2.onload = (_event2) => { 
      this.imgURL2 = reader2.result; 
    }
  }

  onSubmit(){
    const titulo = this.form.value.titulo;
    const descripcion = this.form.value.descripcion;
    let imagen_bienvenida = this.form.value.imagen_bienvenida;
    let imagen_fondo = this.form.value.imagen_fondo;
    imagen_bienvenida=this.imgURL;
    imagen_fondo=this.imgURL2;
    this.bienvenidaService.updateBienvenida(titulo,descripcion,imagen_bienvenida,imagen_fondo);
  }

}
