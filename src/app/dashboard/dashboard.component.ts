import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UsuarioService,
    private router: Router
  ) { 
    this.userService.currentUserProfile$
      .pipe()
      .subscribe((user) => {
        if(user?.rol!="Administrador"){
          this.router.navigate(["bienvenido"]);
        }
    });
  }

  ngOnInit(): void {
  }

}
