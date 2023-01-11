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

  constructor(
    private usarioSerive: UsuarioService, 
    private router: Router, 
    private auth: AuthService, 
    private toast: HotToastService,
    private snackBar: MatSnackBar
  ) {

    this.formLogin = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    })

  }

  ngOnInit(): void {
  }

  async onSubmit(){
    this.snackBar.openFromComponent(AvisoComponent, {
      data: {
        texto: "Cargando",
        clase: "toast-loading",
        icono: "info",
      },
    });
    await this.auth.login(this.formLogin.value).then(()=>{
      this.snackBar.openFromComponent(AvisoComponent, {
        duration: 3000,
        data: {
          texto: "Ha iniciado sesión correctamente",
          clase: "toast-success",
          icono: "check",
        },
      });
    }).catch(()=>{
      this.snackBar.openFromComponent(AvisoComponent, {
        duration: 3000,
        data: {
          texto: "Ha ocurrido un error :(",
          clase: "toast-error",
          icono: "error",
        },
      });
    })
  }

}
