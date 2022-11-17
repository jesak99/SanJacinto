import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Integrantes } from 'src/app/model/integrantes.model';
import { BienvenidaService } from 'src/app/service/bienvenida.service';
import { CardUsuarioComponent } from '../card-usuario/card-usuario.component';

@Component({
  selector: 'app-form-integrante',
  templateUrl: './form-integrante.component.html',
  styleUrls: ['./form-integrante.component.scss']
})
export class FormIntegranteComponent implements OnInit {
  public imagePath?:string;
  imgURL: any;
  public message?: string;
  codigo!: string;

  form !: FormGroup;
  //@Input() integrante!: Integrantes;

  editMode = false;

  constructor(
    public dialogRef: MatDialogRef<CardUsuarioComponent>,
    private bienvenidaService: BienvenidaService, 
    @Inject(MAT_DIALOG_DATA) public integrante: Integrantes
    ) {}

  ngOnInit(): void {
    let foto='';
    let nombre='';
    let puesto='';
    let facebook='';
    let twitter='';
    let telefono='';
    let email='';

    if(this.integrante!=null){
      this.editMode=true;
      this.codigo = this.integrante.codigo;
      this.imgURL = this.integrante.foto;
      nombre = this.integrante.nombre;
      puesto = this.integrante.puesto;
      facebook = this.integrante.facebook;
      twitter = this.integrante.twitter;
      telefono = this.integrante.telefono;
      email = this.integrante.email;
    }

    this.form = new FormGroup({
      foto: new FormControl(foto),
      nombre: new FormControl(nombre, [Validators.required]),
      puesto: new FormControl(puesto, [Validators.required]),
      facebook: new FormControl(facebook),
      twitter: new FormControl(twitter),
      telefono: new FormControl(telefono, [Validators.pattern("[0-9]{10}$")]),
      email: new FormControl(email, [Validators.email])
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

  onSubmit(){
    let codigo = '';
    let foto = this.form.value.foto;
    const nombre = this.form.value.nombre;
    const puesto = this.form.value.puesto;
    const facebook = this.form.value.facebook;
    const twitter = this.form.value.twitter;
    const telefono = this.form.value.telefono;
    const email = this.form.value.email;
    if(foto=='' && !this.editMode){
      foto="../../../assets/perfil.webp";
    }else{
      foto=this.imgURL;
    }

    if(this.editMode){
      const newIntegrante = new Integrantes(this.codigo,nombre,puesto,foto,facebook,twitter,telefono,email);
      this.bienvenidaService.updateIntegrante(newIntegrante);
    }else{
      codigo = "INT"+(this.bienvenidaService.getIntegrantes().length+1);
      const newIntegrante = new Integrantes(codigo,nombre,puesto,foto,facebook,twitter,telefono,email);
      this.bienvenidaService.addIntegrante(newIntegrante);
    }
  }

}
