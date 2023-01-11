import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Banner } from 'src/app/model/banner.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BannerService } from 'src/app/service/banner.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-form-banner',
  templateUrl: './form-banner.component.html',
  styleUrls: ['./form-banner.component.scss']
})
export class FormBannerComponent implements OnInit, AfterViewInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  banners : Banner[] = [];
  banner?: Banner;

  banners$ = this.bannerService.banners$;

  public imagePath?: string;
  public pathImg1!: File;
  imgURL: any;
  public message?: string;

  form !: FormGroup;
  editMode = false;
  codigo!: string;
  posicion!: number;
  clase!: string;

  constructor(
    private bannerService: BannerService,
    private storage: Storage,
    private snackBar: MatSnackBar
  ) { }

  async ngAfterViewInit(){
    this.banners=[];
    await this.bannerService.getBanners().then(response=>{
      response.forEach((doc) => {
        if (doc.exists()) {
          var banTem = new Banner(
            doc.data().codigo,
            doc.data().posicion,
            doc.data().imagen,
            doc.data().color,
            doc.data().titulo,
            doc.data().descripcion,
            doc.data().clase
          );
          this.banners?.push(banTem);
        } else {
          console.log("No such document!");
        }
      });
    }).catch(error=>console.log(error));
  }

  async ngOnInit() {

    let imagen = '';
    let titulo = '';
    let descripcion = '';
    let color = '';

    this.form = new FormGroup({
      imagen: new FormControl(imagen),
      titulo: new FormControl(titulo, [Validators.required]),
      descripcion: new FormControl(descripcion),
      color: new FormControl(color, [Validators.required])
    });
  }

  drop(event: CdkDragDrop<{ titulo: string; imagen: string }[]>) {
    moveItemInArray(this.banners, event.previousIndex, event.currentIndex);
    console.log(this.banners);
  }

  cambiarNuevo() {
    this.editMode = false;
    this.codigo = '';
    this.posicion = 0;
    this.clase = '';
    this.imgURL = null;
    this.form.reset();
  }

  cambiarFormulario(banner: Banner) {
    this.editMode = true;
    this.codigo = banner.codigo;
    this.posicion = banner.posicion;
    let imagen = '';
    this.imgURL = banner.imagen;
    let titulo = banner.titulo;
    let descripcion = banner.descripcion;
    let color = banner.color;
    this.clase = banner.clase;

    this.form = new FormGroup({
      imagen: new FormControl(imagen),
      titulo: new FormControl(titulo, [Validators.required]),
      descripcion: new FormControl(descripcion),
      color: new FormControl(color, [Validators.required])
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
    var cantidad = 0;
    const titulo = this.form.value.titulo;
    const descripcion = this.form.value.descripcion;
    const color = this.form.value.color;
    var imagenBan = this.imgURL;

    await this.bannerService.getCantidadBanners().then(async response => {
      cantidad = response.data().count;

      if (this.pathImg1 != null && this.imgURL!=null) {
        this.snackBar.openFromComponent(AvisoComponent, {
          data: {
            texto: "Subiendo nueva imagen",
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
            imagenBan = url;
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

      if(this.editMode){
        this.snackBar.openFromComponent(AvisoComponent, {
          data: {
            texto: "Actualizando encabezado",
            clase: "toast-loading",
            icono: "info",
          },
        });
        const banner = new Banner(this.codigo,this.posicion,imagenBan,color,titulo,descripcion,this.clase);
        this.bannerService.updateBanner(banner).then(async response=>{
          this.snackBar.openFromComponent(AvisoComponent, {
            duration: 3000,
            data: {
              texto: "Se ha actualizado encabezado",
              clase: "toast-success",
              icono: "check",
            },
          });
          this.form.reset();
          this.imgURL=null;
          await this.ngAfterViewInit();
          await this.guardarOrden();
        });
      }else{
        this.snackBar.openFromComponent(AvisoComponent, {
          data: {
            texto: "Añadiendo nuevo encabezado",
            clase: "toast-loading",
            icono: "info",
          },
        });
        const banner = new Banner('',cantidad+1,imagenBan,color,titulo,descripcion,'');
        await this.bannerService.addBanner(banner).then(async response=>{
          this.snackBar.openFromComponent(AvisoComponent, {
            duration: 3000,
            data: {
              texto: "Se ha añadido el nuevo encabezado",
              clase: "toast-success",
              icono: "check",
            },
          });
          this.form.reset();
          this.imgURL=null;
          await this.ngAfterViewInit();
          await this.guardarOrden();
        }).catch(error=>{
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

    }).catch(error => {
      console.log("El error es " + error)
    })
  }

  async deleteBanner(banner: Banner) {
    this.snackBar.openFromComponent(AvisoComponent, {
      data: {
        texto: "Eliminando encabezado ...",
        clase: "toast-loading",
        icono: "info",
      },
    });
    this.bannerService.deleteBanner(banner).then(async response=>{
      this.snackBar.openFromComponent(AvisoComponent, {
        duration: 3000,
        data: {
          texto: "Se ha eliminado el encabezado",
          clase: "toast-warning",
          icono: "info",
        },
      });
      await this.ngAfterViewInit();
      await this.guardarOrden();
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

  async guardarOrden() {
    for (let i = 0; i < this.banners.length; i++) {
      if (i == 0) {
        this.banners[i].posicion = i;
        this.banners[i].clase = "active";
        await this.bannerService.updateBanner(this.banners[i]).then(response=>{}).catch(error=>error);
      } else {
        this.banners[i].posicion = i;
        this.banners[i].clase = "";
        await this.bannerService.updateBanner(this.banners[i]).then(response=>{}).catch(error=>error);
      }
    }
    this.snackBar.openFromComponent(AvisoComponent, {
      duration: 3000,
      data: {
        texto: "Se han actualizado las posiciones",
        clase: "toast-success",
        icono: "check",
      },
    });
    await this.ngAfterViewInit();
  }

}
