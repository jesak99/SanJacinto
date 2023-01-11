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

  async onSubmit(){
    this.snackBar.openFromComponent(AvisoComponent, {
      data: {
        texto: "Cargando",
        clase: "toast-loading",
        icono: "info",
      },
    });
    this.auth.register(this.formReg.value)
    .then(
        async response => {
          const user = new Usuario(
            response.user.uid, 
            response.user.email, 
            response.user.email,
            '../../../assets/perfil.webp',
            '','','','','',
            'Habitante'
          );
          await this.usuarioService.addUser(user).then(()=>{
            this.snackBar.openFromComponent(AvisoComponent, {
              duration: 3000,
              data: {
                texto: "Ha quedado registrado",
                clase: "toast-success",
                icono: "check",
              },
            });
            this.formReg.reset();
          }).catch(()=>{
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
      )
    .catch(error => {
      if(error.toString()=="FirebaseError: Firebase: Error (auth/email-already-in-use)."){
        this.snackBar.openFromComponent(AvisoComponent, {
          duration: 3000,
          data: {
            texto: "El correo ingresado ya esta en uso",
            clase: "toast-error",
            icono: "error",
          },
        });
      }
    });
  }

  loginWithGoogle(){
    this.snackBar.openFromComponent(AvisoComponent, {
      data: {
        texto: "Cargando",
        clase: "toast-loading",
        icono: "info",
      },
    });
    this.auth.loginWithGoogle()
      .then(
        async response => {
          const user = new Usuario(
            response.user.uid, 
            response.user.displayName, 
            response.user.email,
            response.user.photoURL, 
            '','','','','',
            'Habitante'
          );
          await this.usuarioService.getUser(user.id).then(async response=>{
            if (response.exists()) {
              this.snackBar.openFromComponent(AvisoComponent, {
                duration: 3000,
                data: {
                  texto: "Ha iniciado sesión como "+user.nombre,
                  clase: "toast-success",
                  icono: "check",
                },
              });
              this.router.navigate(['bienvenido']);
            } else {
              await this.usuarioService.addUser(user).then(()=>{
                this.snackBar.openFromComponent(AvisoComponent, {
                  duration: 3000,
                  data: {
                    texto: "Ha iniciado sesión como "+user.nombre,
                    clase: "toast-success",
                    icono: "check",
                  },
                });
                this.router.navigate(['ajustes-cuenta']);
              }).catch(error=>{
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
        }
      )
    .catch(error=>this.snackBar.openFromComponent(AvisoComponent, {
      duration: 3000,
      data: {
        texto: "Ha ocurrido un error :(",
        clase: "toast-error",
        icono: "error",
      },
  }));
  }

  loginWithFacebook(){
    this.snackBar.openFromComponent(AvisoComponent, {
      data: {
        texto: "Cargando",
        clase: "toast-loading",
        icono: "info",
      },
    });
    this.auth.loginWithFacebook()
      .then(
        async response => {
          const user = new Usuario(
            response.user.uid, 
            response.user.displayName, 
            response.user.email,
            response.user.photoURL, 
            '','','','','',
            'Habitante'
          );
          await this.usuarioService.getUser(user.id).then(async response=>{
            if (response.exists()) {
              this.snackBar.openFromComponent(AvisoComponent, {
                duration: 3000,
                data: {
                  texto: "Ha iniciado sesión como "+user.nombre,
                  clase: "toast-success",
                  icono: "check",
                },
              });
              this.router.navigate(['bienvenido']);
            } else {
              await this.usuarioService.addUser(user).then(()=>{
                this.snackBar.openFromComponent(AvisoComponent, {
                  duration: 3000,
                  data: {
                    texto: "Ha iniciado sesión como "+user.nombre,
                    clase: "toast-success",
                    icono: "check",
                  },
                });
                this.router.navigate(['ajustes-cuenta']);
              }).catch(error=>{
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
    .catch(error=>this.snackBar.openFromComponent(AvisoComponent, {
      duration: 3000,
      data: {
        texto: "Ha ocurrido un error :(",
        clase: "toast-error",
        icono: "error",
      },
  }));
  }

}
