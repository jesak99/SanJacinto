import { Component, OnInit } from '@angular/core';
import { Principal } from '../model/principal.model';
import { PrincipalService } from '../service/principal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  infoPrincipal ?: Principal;
  currentInfo$ = this.principalService.currentInformation$;

  constructor(private principalService: PrincipalService) { }

  ngOnInit(): void{
    this.infoPrincipal = this.principalService.getInfoLocal();
    this.principalService.newInfo.subscribe((datosPrincipales : Principal)=>{
      this.infoPrincipal = this.principalService.getInfoLocal();
    });
/*
    await this.principalService.getInfo().then(response => {
      if (response.exists()) {
        const tem = response.data();
        const infoTem = new Principal(
          tem.frase_izq,
          tem.frase_der,
          tem.frase_inf,
          tem.icono_enc,
          tem.icono_pri,
          tem.tema_pagi,
          tem.horario_1,
          tem.horario_2,
          tem.telefono1,
          tem.telefono2,
          tem.email1,
          tem.email2,
          tem.direccion,
          tem.direccion_link,
          tem.facebook,
          tem.facebook_link,
          tem.twitter,
          tem.twitter_link,
          tem.instagram,
          tem.instagram_link,
          tem.youtube,
          tem.youtube_link
        );
        this.infoPrincipal=infoTem;
      } else {
        console.log("No existen datos")
      }
    }).catch(error => console.log(error));*/
  }

}
