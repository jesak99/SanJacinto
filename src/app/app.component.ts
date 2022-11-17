import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Principal } from './model/principal.model';
import { PrincipalService } from './service/principal.service';
import { UsuarioService } from './service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SanJacinto';
  infoPrincipal !: Principal;

  header_variable = false;

  constructor(private principalService: PrincipalService, private usuarioService: UsuarioService, private router: Router){}

  ngOnInit(): void{
    this.infoPrincipal = this.principalService.getInfo();
    this.principalService.newInfo.subscribe((datosPrincipales : Principal)=>{
      this.infoPrincipal = this.principalService.getInfo();
    });
  }

  logout(){
    this.usuarioService.logout()
    .then(()=>{
      this.router.navigate(['/bienvenido'])
    })
    .catch(error=>console.log(error));
  }
}
