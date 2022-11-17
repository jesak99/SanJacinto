import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Principal } from '../model/principal.model';
import { PrincipalService } from '../service/principal.service';

@Component({
  selector: 'app-info-pagina',
  templateUrl: './info-pagina.component.html',
  styleUrls: ['./info-pagina.component.scss']
})
export class InfoPaginaComponent implements OnInit {
  infoPrincipal !: Principal;
  form!: FormGroup;

  constructor(private principalService: PrincipalService) { }

  ngOnInit(): void {
    this.infoPrincipal = this.principalService.getInfo();
    this.principalService.newInfo.subscribe((datosPrincipales : Principal)=>{
      this.infoPrincipal = this.principalService.getInfo();
    });

    let frase_izq=this.infoPrincipal.frase_izq;
    let frase_der=this.infoPrincipal.frase_der;
    let frase_inf=this.infoPrincipal.frase_inf;
    let icono_enc=this.infoPrincipal.icono_enc;
    let icono_pri=this.infoPrincipal.icono_pri;
    let tema_pagi=this.infoPrincipal.tema_pagi;
    let horario_1=this.infoPrincipal.horario_1;
    let horario_2=this.infoPrincipal.horario_2;
    let telefono1=this.infoPrincipal.telefono1;
    let telefono2=this.infoPrincipal.telefono2;
    let email1=this.infoPrincipal.email1;
    let email2=this.infoPrincipal.email2;
    let direccion=this.infoPrincipal.direccion;
    let direccion_link=this.infoPrincipal.direccion_link;
    let facebook=this.infoPrincipal.facebook;
    let facebook_link=this.infoPrincipal.facebook_link;
    let twitter=this.infoPrincipal.twitter;
    let twitter_link=this.infoPrincipal.twitter_link;
    let instagram=this.infoPrincipal.instagram;
    let instagram_link=this.infoPrincipal.instagram_link;
    let youtube=this.infoPrincipal.youtube;
    let youtube_link=this.infoPrincipal.youtube_link;

    this.form = new FormGroup({
      frase_izq : new FormControl(frase_izq, [Validators.required]),
      frase_der : new FormControl(frase_der, [Validators.required]),
      frase_inf : new FormControl(frase_inf, [Validators.required]),
      icono_enc : new FormControl(icono_enc, [Validators.required]),
      icono_pri : new FormControl(icono_pri, [Validators.required]),
      tema_pagi : new FormControl(tema_pagi),
      horario_1 : new FormControl(horario_1, [Validators.required]),
      horario_2 : new FormControl(horario_2),
      telefono1 : new FormControl(telefono1, [Validators.required, Validators.pattern("[0-9]{10}$")]),
      telefono2 : new FormControl(telefono2, [Validators.pattern("[0-9]{10}$")]),
      email1 : new FormControl(email1, [Validators.required, Validators.email]),
      email2 : new FormControl(email2, [Validators.email]),
      direccion : new FormControl(direccion, [Validators.required]),
      direccion_link : new FormControl(direccion_link, [Validators.required]),
      facebook : new FormControl(facebook),
      facebook_link : new FormControl(facebook_link),
      twitter : new FormControl(twitter),
      twitter_link : new FormControl(twitter_link),
      instagram : new FormControl(instagram),
      instagram_link : new FormControl(instagram_link),
      youtube : new FormControl(youtube),
      youtube_link : new FormControl(youtube_link)
    });
  }

  onSubmit(){
    const frase_izq=this.form.value.frase_izq;
    const frase_der=this.form.value.frase_der;
    const frase_inf=this.form.value.frase_inf;
    const icono_enc=this.form.value.icono_enc;
    const icono_pri=this.form.value.icono_pri;
    const tema_pagi=this.form.value.tema_pagi;
    const horario_1=this.form.value.horario_1;
    const horario_2=this.form.value.horario_2;
    const telefono1=this.form.value.telefono1;
    const telefono2=this.form.value.telefono2;
    const email1=this.form.value.email1;
    const email2=this.form.value.email2;
    const direccion=this.form.value.direccion;
    const direccion_link=this.form.value.direccion_link;
    const facebook=this.form.value.facebook;
    const facebook_link=this.form.value.facebook_link;
    const twitter=this.form.value.twitter;
    const twitter_link=this.form.value.twitter_link;
    const instagram=this.form.value.instagram;
    const instagram_link=this.form.value.instagram_link;
    const youtube=this.form.value.youtube;
    const youtube_link=this.form.value.youtube_link;

    const newInfo = new Principal(frase_izq,frase_der,frase_inf,icono_enc,icono_pri,tema_pagi,horario_1,horario_2,telefono1,telefono2,email1,email2,direccion,direccion_link,facebook,facebook_link,twitter,twitter_link,instagram,instagram_link,youtube,youtube_link);
    this.principalService.updateInfo(newInfo);
    console.log(newInfo)
  }

}
