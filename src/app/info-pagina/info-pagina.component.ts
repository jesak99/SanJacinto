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
export class InfoPaginaComponent implements OnInit {
  infoPrincipal?: Principal;
  form!: FormGroup;

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

  ngOnInit() {
    this.infoPrincipal = this.principalService.getInfoLocal();
    this.principalService.newInfo.subscribe((datosPrincipales: Principal) => {
      this.infoPrincipal = this.principalService.getInfoLocal();
    });

    let frase_izq = this.infoPrincipal?.frase_izq;
    let frase_der = this.infoPrincipal?.frase_der;
    let frase_inf = this.infoPrincipal?.frase_inf;
    this.imgURL = this.infoPrincipal?.icono_enc;
    this.imgURL2 = this.infoPrincipal?.icono_pri;
    let icono_enc = '';
    let icono_pri = '';
    let tema_pagi = this.infoPrincipal?.tema_pagi;
    let horario_1 = this.infoPrincipal?.horario_1;
    let horario_2 = this.infoPrincipal?.horario_2;
    let telefono1 = this.infoPrincipal?.telefono1;
    let telefono2 = this.infoPrincipal?.telefono2;
    let email1 = this.infoPrincipal?.email1;
    let email2 = this.infoPrincipal?.email2;
    let direccion = this.infoPrincipal?.direccion;
    let direccion_link = this.infoPrincipal?.direccion_link;
    let facebook = this.infoPrincipal?.facebook;
    let facebook_link = this.infoPrincipal?.facebook_link;
    let twitter = this.infoPrincipal?.twitter;
    let twitter_link = this.infoPrincipal?.twitter_link;
    let instagram = this.infoPrincipal?.instagram;
    let instagram_link = this.infoPrincipal?.instagram_link;
    let youtube = this.infoPrincipal?.youtube;
    let youtube_link = this.infoPrincipal?.youtube_link;

    this.form = new FormGroup({
      frase_izq: new FormControl(frase_izq, [Validators.required]),
      frase_der: new FormControl(frase_der, [Validators.required]),
      frase_inf: new FormControl(frase_inf, [Validators.required]),
      icono_enc: new FormControl(icono_enc),
      icono_pri: new FormControl(icono_pri),
      tema_pagi: new FormControl(tema_pagi),
      horario_1: new FormControl(horario_1, [Validators.required]),
      horario_2: new FormControl(horario_2),
      telefono1: new FormControl(telefono1, [Validators.required, Validators.pattern("[0-9]{10}$")]),
      telefono2: new FormControl(telefono2, [Validators.pattern("[0-9]{10}$")]),
      email1: new FormControl(email1, [Validators.required, Validators.email]),
      email2: new FormControl(email2, [Validators.email]),
      direccion: new FormControl(direccion, [Validators.required]),
      direccion_link: new FormControl(direccion_link, [Validators.required]),
      facebook: new FormControl(facebook),
      facebook_link: new FormControl(facebook_link),
      twitter: new FormControl(twitter),
      twitter_link: new FormControl(twitter_link),
      instagram: new FormControl(instagram),
      instagram_link: new FormControl(instagram_link),
      youtube: new FormControl(youtube),
      youtube_link: new FormControl(youtube_link)
    });
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
          this.toast.error("Ha ocurrido un error :(");
        });
    }

    const newInfo = new Principal(frase_izq, frase_der, frase_inf, icono_enc, icono_pri, tema_pagi, horario_1, horario_2, telefono1, telefono2, email1, email2, direccion, direccion_link, facebook, facebook_link, twitter, twitter_link, instagram, instagram_link, youtube, youtube_link);
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
