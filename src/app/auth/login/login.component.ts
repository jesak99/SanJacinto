import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  formLogin: FormGroup;

  constructor(private usarioSerive: UsuarioService, private router: Router, private snackBar: MatSnackBar) { 
    this.formLogin = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.usarioSerive.login(this.formLogin.value)
      .then(response => {
        this.formLogin.reset();
        this.snackBar.openFromComponent(AvisoComponent, {
          duration: 3000,
          data: "Ha iniciado sesión como "+ response.user.displayName,
        });
        this.router.navigate(['/dashboard']);
      })
    .catch(error => {
      if(error.toString()=="FirebaseError: Firebase: Error (auth/wrong-password)."){
        this.snackBar.openFromComponent(AvisoComponent, {
          duration: 3000,
          data: "La contraseña ingresada es incorrecta",
        });
      }
      if(error.toString()=="FirebaseError: Firebase: Error (auth/user-not-found)."){
        this.snackBar.openFromComponent(AvisoComponent, {
          duration: 3000,
          data: "El email ingresado no se encuentra registrado",
        });
      }
    });
  }

}
