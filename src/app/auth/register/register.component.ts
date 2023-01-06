import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AvisoComponent } from 'src/app/aviso/aviso.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  formReg: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private toast: HotToastService) { 
    this.formReg = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.auth.register(this.formReg.value)
    .pipe(
      this.toast.observe({
        success: 'Se ha registrado correctamente',
        loading: 'Cargando ...',
        error: 'Ha ocurrido un error',
      })
    )
    .subscribe(() => {
      this.formReg.reset();
    });
    /*
      .then(
        async response => {
          const user = new Usuario(response.user.uid, response.user.email, response.user.email,response.user.photoURL, 'normal');
          await this.usarioSerive.addUser(user);
          this.snackBar.openFromComponent(AvisoComponent, {
            duration: 3000,
            data: "Usuario registrado con exito",
          });
          this.formReg.reset();
        }
      )
    .catch(error => {
      if(error.toString()=="FirebaseError: Firebase: Error (auth/email-already-in-use)."){
        this.snackBar.openFromComponent(AvisoComponent, {
          duration: 3000,
          data: "El email ingresado ya se encuentra registrado",
        });
      }
    });*/
  }

  loginWithGoogle(){
    this.auth.loginWithGoogle()
      .then(
        async response => {
          const user = new Usuario(response.user.uid, response.user.displayName, response.user.email,response.user.photoURL, 'normal');
          await this.usuarioService.getUser(user.id).then(async response=>{
            if (response.exists()) {

            } else {
              await this.usuarioService.addUser(user).then(()=>{}).catch(error=>{
                this.snackBar.openFromComponent(AvisoComponent, {
                  duration: 3000,
                  data: {
                    texto: "Ha ocurrido un error :(",
                    clase: "toast-error",
                    icono: "error",
                  },
                });
              });
            }
          })
          .catch(error=>
            this.snackBar.openFromComponent(AvisoComponent, {
              duration: 3000,
              data: {
                texto: "Ha ocurrido un error :(",
                clase: "toast-error",
                icono: "error",
              },
          }));
          this.snackBar.openFromComponent(AvisoComponent, {
            duration: 3000,
            data: {
              texto: "Ha iniciado sesión como "+user.nombre,
              clase: "toast-success",
              icono: "check",
            },
          });
          this.router.navigate(['bienvenido']);
        }
      )
    .catch(error=>this.toast.error("Ha ocurrido un error :("));
  }

  loginWithFacebook(){
    this.auth.loginWithFacebook()
      .then(
        async response => {
          const user = new Usuario(response.user.uid, response.user.displayName, response.user.email,response.user.photoURL, 'Habitante');
          await this.usuarioService.getUser(user.id).then(async response=>{
            if (response.exists()) {

            } else {
              await this.usuarioService.addUser(user).then(()=>{}).catch(error=>{
                this.snackBar.openFromComponent(AvisoComponent, {
                  duration: 3000,
                  data: {
                    texto: "Ha ocurrido un error :(",
                    clase: "toast-error",
                    icono: "error",
                  },
                });
              });
            }
          })
          .catch(error=>
            this.snackBar.openFromComponent(AvisoComponent, {
              duration: 3000,
              data: {
                texto: "Ha ocurrido un error :(",
                clase: "toast-error",
                icono: "error",
              },
            })
          );
          this.snackBar.openFromComponent(AvisoComponent, {
            duration: 3000,
            data: {
              texto: "Ha iniciado sesión como "+user.nombre,
              clase: "toast-success",
              icono: "check",
            },
          });
          this.router.navigate(['bienvenido']);
        }
      )
    .catch(error=>this.toast.error("Ha ocurrido un error :("));
  }

}
