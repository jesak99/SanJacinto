import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Bienvenida } from 'src/app/model/bienvenida.model';
import { Pagina } from 'src/app/model/pagina.model';
import { PaginaService } from 'src/app/service/pagina.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';

@Component({
  selector: 'app-form-bienvenido',
  templateUrl: './form-bienvenido.component.html',
  styleUrls: ['./form-bienvenido.component.scss']
})
export class FormBienvenidoComponent implements OnInit, AfterViewInit {
  public imagePath?: string;
  public pathImg1!: File;
  imgURL: any;
  public message?: string;

  public imagePath2?: string;
  public pathImg2!: File;
  imgURL2: any;
  public message2?: string;

  titulo='';
  descripcion=''
  imagen_bienvenida='';
  imagen_fondo='';

  form = new FormGroup({
    titulo : new FormControl(this.titulo, [Validators.required]),
    descripcion : new FormControl(this.descripcion, [Validators.required]),
    imagen_bienvenida : new FormControl(this.imagen_bienvenida),
    imagen_fondo : new FormControl(this.imagen_fondo)
  });

  editMode = false;

  constructor(
    public dialogRef: MatDialogRef<FormBienvenidoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Bienvenida,
    private paginaService: PaginaService,
    private storage: Storage,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit(){
    await this.paginaService.getPag("bienvenido").then(response=>{
      if (response.exists()) {
        const tem = response.data();
        this.titulo = tem.nombre;
        this.descripcion = tem.descripcion;
        this.imgURL = tem.fondoEncabezado;
        this.imgURL2 = tem.fondoPagina;
        this.ngAfterViewInit();
      }
    }).catch(error=>console.log(error))
  }

  ngAfterViewInit(): void {
    this.form = new FormGroup({
      titulo : new FormControl(this.titulo, [Validators.required]),
      descripcion : new FormControl(this.descripcion, [Validators.required]),
      imagen_bienvenida : new FormControl(this.imagen_bienvenida),
      imagen_fondo : new FormControl(this.imagen_fondo)
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

  async onSubmit(){
    const titulo = this.form.value.titulo;
    const descripcion = this.form.value.descripcion;
    var imagen_bienvenida = this.imgURL;
    var imagen_fondo = this.imgURL2;

    if (this.pathImg1 != null) {
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
          imagen_bienvenida = url;
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
          imagen_fondo = url;
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

    const pagTem = new Pagina('bienvenido', titulo??'', descripcion??'', imagen_bienvenida??'', imagen_fondo??'');
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

}
