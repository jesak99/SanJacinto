import { Component, HostListener, OnInit } from '@angular/core';
import { Principal } from './model/principal.model';
import { PrincipalService } from './service/principal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SanJacinto';
  infoPrincipal !: Principal;

  header_variable = false;

  constructor(private principalService: PrincipalService){}

  ngOnInit(): void{
    this.infoPrincipal = this.principalService.getInfo();
    this.principalService.newInfo.subscribe((datosPrincipales : Principal)=>{
      this.infoPrincipal = this.principalService.getInfo();
    });
  }
}
