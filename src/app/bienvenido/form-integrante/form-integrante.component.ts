import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Integrantes } from 'src/app/model/integrantes.model';
import { IntegranteService } from 'src/app/service/integrantes.service';
import { CardUsuarioComponent } from '../card-usuario/card-usuario.component';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-form-integrante',
  templateUrl: './form-integrante.component.html',
  styleUrls: ['./form-integrante.component.scss']
})
export class FormIntegranteComponent implements OnInit {
  public imagePath?: string;
  public pathImg1!: File;
  imgURL: any;
  public message?: string;

  codigo!: string;

  form !: FormGroup;
  //@Input() integrante!: Integrantes;

  editMode = false;

  constructor(
    public dialogRef: MatDialogRef<CardUsuarioComponent>,
    private storage: Storage,
    private snackBar: MatSnackBar,
    private integranteService: IntegranteService,
    @Inject(MAT_DIALOG_DATA) public integrante: Integrantes
  ) { }

  ngOnInit(): void {
    let foto = '';
    let nombre = '';
    let puesto = '';
    let facebook = '';
    let twitter = '';
    let telefono = '';
    let email = '';

    if (this.integrante != null) {
      this.editMode = true;
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

  preview(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    this.pathImg1 = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  async onSubmit() {
    let codigo = '';
    let foto = this.form.value.foto;
    const nombre = this.form.value.nombre;
    const puesto = this.form.value.puesto;
    const facebook = this.form.value.facebook;
    const twitter = this.form.value.twitter;
    const telefono = this.form.value.telefono;
    const email = this.form.value.email;

    if (this.pathImg1 != null) {
      this.snackBar.openFromComponent(AvisoComponent, {
        data: {
          texto: "Subiendo imagen",
          clase: "toast-loading",
          icono: "info",
        },
      });
      const imgRef = ref(this.storage, 'imagenes/' + this.pathImg1.name);

      await uploadBytes(imgRef, this.pathImg1).then((snapshot) => {
      }).catch(error => {
        this.snackBar.openFromComponent(AvisoComponent, {
          duration: 3000,
          data: {
            texto: "Ha ocurrido un error :(",
            clase: "toast-error",
            icono: "error",
          },
        });
      });
      await getDownloadURL(imgRef)
        .then((url) => {
          this.snackBar.openFromComponent(AvisoComponent, {
            duration: 3000,
            data: {
              texto: "Imagen subida con éxito",
              clase: "toast-success",
              icono: "check",
            },
          });
          foto = url;
        })
        .catch((error) => {
          this.snackBar.openFromComponent(AvisoComponent, {
            duration: 3000,
            data: {
              texto: "Ha ocurrido un error :(",
              clase: "toast-error",
              icono: "error",
            },
          });
        });
    }else{
      if(this.imgURL!=null){
        foto = this.imgURL;
      }else{
        foto = "../../../assets/perfil.webp";
      }
    }
    
    if (this.editMode) {
      this.snackBar.openFromComponent(AvisoComponent, {
        data: {
          texto: "Actualizando la información del integrante",
          clase: "toast-loading",
          icono: "info",
        },
      });
      const newIntegrante = new Integrantes(this.codigo, nombre, puesto, foto, facebook, twitter, telefono, email);
      this.integranteService.updateIntegrante(newIntegrante).then(response=>{
        this.snackBar.openFromComponent(AvisoComponent, {
          duration: 3000,
          data: {
            texto: "Se ha actualizado la informacion del integrante",
            clase: "toast-success",
            icono: "check",
          },
        });
        this.dialogRef.close();
      }).catch((error) => {
        this.snackBar.openFromComponent(AvisoComponent, {
          duration: 3000,
          data: {
            texto: "Ha ocurrido un error :(",
            clase: "toast-error",
            icono: "error",
          },
        });
      });
    } else {
      this.snackBar.openFromComponent(AvisoComponent, {
        data: {
          texto: "Añadiendo nuevo integrante",
          clase: "toast-loading",
          icono: "info",
        },
      });
      const newIntegrante = new Integrantes('', nombre, puesto, foto, facebook, twitter, telefono, email);
      this.integranteService.addIntegrante(newIntegrante).then(response=>{
        this.snackBar.openFromComponent(AvisoComponent, {
          duration: 3000,
          data: {
            texto: "Se ha añadido el nuevo integrante",
            clase: "toast-success",
            icono: "check",
          },
        });
        this.dialogRef.close();
      }).catch((error) => {
        this.snackBar.openFromComponent(AvisoComponent, {
          duration: 3000,
          data: {
            texto: "Ha ocurrido un error :(",
            clase: "toast-error",
            icono: "error",
          },
        });
      });
    }
  }

}
