import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Pagina } from 'src/app/model/pagina.model';
import { Publicacion } from 'src/app/model/publicacion.model';
import { PaginaService } from 'src/app/service/pagina.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';

@Component({
  selector: 'app-form-pagina',
  templateUrl: './form-pagina.component.html',
  styleUrls: ['./form-pagina.component.scss']
})
export class FormPaginaComponent implements OnInit {
  public imagePath?: string;
  public pathImg1!: File;
  imgURL: any;
  public message?: string;

  public imagePath2?: string;
  public pathImg2!: File;
  imgURL2: any;
  public message2?: string;

  id:string='';

  form !: FormGroup;
  publicaciones !: Publicacion[];

  constructor(
    public dialogRef: MatDialogRef<FormPaginaComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Pagina,
    private paginaService: PaginaService,
    private storage: Storage,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let id='';
    let nombre='';
    let descripcion='';
    let fondoEncabezado='';
    let fondoPagina='';

    if(this.data!=null){
      this.id=this.data.id;
      nombre=this.data.nombre;
      descripcion=this.data.descripcion;
      this.imgURL=this.data.fondoEncabezado;
      this.imgURL2=this.data.fondoPagina;
    }

    this.form = new FormGroup({
      nombre : new FormControl(nombre, [Validators.required]),
      descripcion : new FormControl(descripcion),
      fondoEncabezado : new FormControl(fondoEncabezado),
      fondoPagina : new FormControl(fondoPagina)
    });

  }

  async onSubmit(){
    const nombre = this.form.value.nombre;
    const descripcion = this.form.value.descripcion;
    var fondoEncabezado = this.imgURL;
    var fondoPagina = this.imgURL2;

    if (this.pathImg1 != null) {
      this.snackBar.openFromComponent(AvisoComponent, {
        data: {
          texto: "Subiendo imagen de encabezado",
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
          fondoEncabezado = url;
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
    }

    if (this.pathImg2 != null) {
      this.snackBar.openFromComponent(AvisoComponent, {
        data: {
          texto: "Subiendo imagen de fondo de página",
          clase: "toast-loading",
          icono: "info",
        },
      });
      const imgRef2 = ref(this.storage, 'imagenes/' + this.pathImg2.name);
      await uploadBytes(imgRef2, this.pathImg2).then((snapshot) => {
      }).catch(error =>
        this.snackBar.openFromComponent(AvisoComponent, {
          duration: 3000,
          data: {
            texto: "Ha ocurrido un error :(",
            clase: "toast-error",
            icono: "error",
          },
        })
      );
      await getDownloadURL(imgRef2)
        .then((url) => {
          this.snackBar.openFromComponent(AvisoComponent, {
            duration: 3000,
            data: {
              texto: "Imagen subida con éxito",
              clase: "toast-success",
              icono: "check",
            },
          });
          fondoPagina = url;
        })
        .catch((error) => {
          this.snackBar.openFromComponent(AvisoComponent, {
            duration: 3000,
            data: {
              texto: "Ha ocurrido un error :(",
              clase: "toast-error",
              icono: "error",
            },
          })
        });
    }

    this.snackBar.openFromComponent(AvisoComponent, {
      data: {
        texto: "Acualizando los datos",
        clase: "toast-loading",
        icono: "info",
      },
    });
    const pagTem = new Pagina(this.id, nombre, descripcion, fondoEncabezado, fondoPagina);
    await this.paginaService.updatePag(pagTem).then(response => {
      this.snackBar.openFromComponent(AvisoComponent, {
        duration: 3000,
        data: {
          texto: "Se han actualizado los datos",
          clase: "toast-success",
          icono: "check",
        },
      });
      this.dialogRef.close();
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

  preview2(files: any) {
    if (files.length === 0)
      return;

    var mimeType2 = files[0].type;
    if (mimeType2.match(/image\/*/) == null) {
      this.message2 = "Only images are supported.";
      return;
    }

    var reader2 = new FileReader();
    this.imagePath2 = files;
    this.pathImg2 = files[0];
    reader2.readAsDataURL(files[0]);
    reader2.onload = (_event2) => {
      this.imgURL2 = reader2.result;
    }
  }

}
