import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  hide = true;

  constructor(
    private userService: UsuarioService,
    private router: Router
  ) {
    this.userService.currentUserProfile$
    .pipe()
    .subscribe((user)=>{
      if(user!=null){
        this.router.navigate(["bienvenido"]);
      }
    })
  }

  ngOnInit(): void {
  }

}
