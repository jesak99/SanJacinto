import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Principal } from '../model/principal.model';
import { PrincipalService } from '../service/principal.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';
import { HotToastService } from '@ngneat/hot-toast';
import { ImageUploadService } from '../service/upload.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-info-pagina',
  templateUrl: './info-pagina.component.html',
  styleUrls: ['./info-pagina.component.scss']
})
export class InfoPaginaComponent implements OnInit, AfterViewInit {
  infoPrincipal?: Principal;

  frase_izq = "";
  frase_der = "";
  frase_inf = "";
  icono_enc = "";
  icono_pri = "";
  tema_pagi = false;
  horario_1 = "";
  horario_2 = "";
  telefono1 = "";
  telefono2 = "";
  email1 = "";
  email2 = "";
  direccion = "";
  direccion_link = "";
  facebook = "";
  facebook_link = "";
  twitter = "";
  twitter_link = "";
  instagram = "";
  instagram_link = "";
  youtube = "";
  youtube_link = "";

  form = new FormGroup({
    frase_izq: new FormControl(this.frase_izq, [Validators.required]),
    frase_der: new FormControl(this.frase_der, [Validators.required]),
    frase_inf: new FormControl(this.frase_inf, [Validators.required]),
    icono_enc: new FormControl(this.icono_enc),
    icono_pri: new FormControl(this.icono_pri),
    tema_pagi: new FormControl(this.tema_pagi),
    horario_1: new FormControl(this.horario_1, [Validators.required]),
    horario_2: new FormControl(this.horario_2),
    telefono1: new FormControl(this.telefono1, [Validators.required, Validators.pattern("[0-9]{10}$")]),
    telefono2: new FormControl(this.telefono2, [Validators.pattern("[0-9]{10}$")]),
    email1: new FormControl(this.email1, [Validators.required, Validators.email]),
    email2: new FormControl(this.email2, [Validators.email]),
    direccion: new FormControl(this.direccion, [Validators.required]),
    direccion_link: new FormControl(this.direccion_link, [Validators.required]),
    facebook: new FormControl(this.facebook),
    facebook_link: new FormControl(this.facebook_link),
    twitter: new FormControl(this.twitter),
    twitter_link: new FormControl(this.twitter_link),
    instagram: new FormControl(this.instagram),
    instagram_link: new FormControl(this.instagram_link),
    youtube: new FormControl(this.youtube),
    youtube_link: new FormControl(this.youtube_link)
  });

  public imagePath?: string;
  public pathImg1!: File;
  imgURL: any;
  public message?: string;

  public imagePath2?: string;
  public pathImg2!: File;
  imgURL2: any;
  public message2?: string;

  constructor(
    private principalService: PrincipalService,
    private storage: Storage,
    private snackBar: MatSnackBar,
    private toast: HotToastService,
    private upload: ImageUploadService
  ) { }

  ngAfterViewInit(): void {
    this.form = new FormGroup({
      frase_izq: new FormControl(this.frase_izq, [Validators.required]),
      frase_der: new FormControl(this.frase_der, [Validators.required]),
      frase_inf: new FormControl(this.frase_inf, [Validators.required]),
      icono_enc: new FormControl(this.icono_enc),
      icono_pri: new FormControl(this.icono_pri),
      tema_pagi: new FormControl(this.tema_pagi),
      horario_1: new FormControl(this.horario_1, [Validators.required]),
      horario_2: new FormControl(this.horario_2),
      telefono1: new FormControl(this.telefono1, [Validators.required, Validators.pattern("[0-9]{10}$")]),
      telefono2: new FormControl(this.telefono2, [Validators.pattern("[0-9]{10}$")]),
      email1: new FormControl(this.email1, [Validators.required, Validators.email]),
      email2: new FormControl(this.email2, [Validators.email]),
      direccion: new FormControl(this.direccion, [Validators.required]),
      direccion_link: new FormControl(this.direccion_link, [Validators.required]),
      facebook: new FormControl(this.facebook),
      facebook_link: new FormControl(this.facebook_link),
      twitter: new FormControl(this.twitter),
      twitter_link: new FormControl(this.twitter_link),
      instagram: new FormControl(this.instagram),
      instagram_link: new FormControl(this.instagram_link),
      youtube: new FormControl(this.youtube),
      youtube_link: new FormControl(this.youtube_link)
    });
  }

  async ngOnInit() {
    await this.principalService.getInfo().then(response => {
      if (response.exists()) {
        const tem = response.data();
        this.frase_izq = tem.frase_izq;
        this.frase_der = tem.frase_der;
        this.frase_inf = tem.frase_inf;
        this.imgURL = tem.icono_enc;
        this.imgURL2 = tem.icono_pri;
        this.tema_pagi = tem.tema_pagi;
        this.horario_1 = tem.horario_1;
        this.horario_2 = tem.horario_2;
        this.telefono1 = tem.telefono1;
        this.telefono2 = tem.telefono2;
        this.email1 = tem.email1;
        this.email2 = tem.email2;
        this.direccion = tem.direccion;
        this.direccion_link = tem.direccion_link;
        this.facebook = tem.facebook;
        this.facebook_link = tem.facebook_link;
        this.twitter = tem.twitter;
        this.twitter_link = tem.twitter_link;
        this.instagram = tem.instagram;
        this.instagram_link = tem.instagram_link;
        this.youtube = tem.youtube;
        this.youtube_link = tem.youtube_link;
        this.ngAfterViewInit();
      } else {
        console.log("No existen datos")
      }
    }).catch(error => console.log(error));
  }

  async onSubmit() {
    const frase_izq = this.form.value.frase_izq;
    const frase_der = this.form.value.frase_der;
    const frase_inf = this.form.value.frase_inf;
    var icono_enc = this.imgURL;
    var icono_pri = this.imgURL2;
    const tema_pagi = this.form.value.tema_pagi;
    const horario_1 = this.form.value.horario_1;
    const horario_2 = this.form.value.horario_2;
    const telefono1 = this.form.value.telefono1;
    const telefono2 = this.form.value.telefono2;
    const email1 = this.form.value.email1;
    const email2 = this.form.value.email2;
    const direccion = this.form.value.direccion;
    const direccion_link = this.form.value.direccion_link;
    const facebook = this.form.value.facebook;
    const facebook_link = this.form.value.facebook_link;
    const twitter = this.form.value.twitter;
    const twitter_link = this.form.value.twitter_link;
    const instagram = this.form.value.instagram;
    const instagram_link = this.form.value.instagram_link;
    const youtube = this.form.value.youtube;
    const youtube_link = this.form.value.youtube_link;

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
          icono_enc = url;
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
          icono_pri = url;
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

    const newInfo = new Principal(frase_izq??'', frase_der??'', frase_inf??'', icono_enc??'', icono_pri??'', tema_pagi??false, horario_1??'', horario_2??'', telefono1??'', telefono2??'', email1??'', email2??'', direccion??'', direccion_link??'', facebook??'', facebook_link??'', twitter??'', twitter_link??'', instagram??'', instagram_link??'', youtube??'', youtube_link??'');
    await this.principalService.updateInfoDatabase(newInfo).then(response => {
      this.snackBar.openFromComponent(AvisoComponent, {
        duration: 3000,
        data: {
          texto: "Se han actualizado los datos",
          clase: "toast-success",
          icono: "check",
        },
      });
      this.principalService.setInfo(newInfo);
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
