import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  formLogin: FormGroup;

  constructor(private usarioSerive: UsuarioService, private router: Router, private auth: AuthService, private toast: HotToastService) { 
    this.formLogin = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.auth.login(this.formLogin.value)
    .pipe(
      this.toast.observe({
        success: 'Ha iniciado sesión correctamente',
        loading: 'Cargando ...',
        error: 'Ha ocurrido un error',
      })
    )
    .subscribe(() => {
      this.router.navigate(['bienvenido']);
    });
  }

}
