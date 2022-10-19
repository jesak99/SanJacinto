import { Component, OnInit } from '@angular/core';
import { Principal } from '../model/principal.model';
import { PrincipalService } from '../service/principal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  infoPrincipal !: Principal;

  constructor(private principalService: PrincipalService) { }

  ngOnInit(): void {
    this.infoPrincipal = this.principalService.getInfo();
    this.principalService.newInfo.subscribe((datosPrincipales : Principal)=>{
      this.infoPrincipal = this.principalService.getInfo();
    });
  }

}
