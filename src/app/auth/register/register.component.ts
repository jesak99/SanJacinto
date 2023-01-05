import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  formReg: FormGroup;

  constructor(
    private usarioSerive: UsuarioService, 
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
    /*
      .then(
        async response => {
          const user = new Usuario(response.user.uid, response.user.displayName, response.user.email,response.user.photoURL, 'normal');
          await this.usarioSerive.getUser(user.id).then(async response=>{
            if (response.exists()) {
              //console.log("Document data:", response.data());
              const tem = response.data();
              const userTem = new Usuario(tem.id,tem.nombre,tem.email,tem.fotoPerfil,tem.rol);
              this.usarioSerive.setUser(userTem);
            } else {
              // doc.data() will be undefined in this case
              //console.log("No such document!");
              await this.usarioSerive.addUser(user);
              this.usarioSerive.setUser(user);
            }
          })
          .catch(error=>console.log(error));
          this.snackBar.openFromComponent(AvisoComponent, {
            duration: 3000,
            data: "Ha iniciado sesión como "+ user.nombre,
          });
          this.router.navigate(['bienvenido']);
        }
      )
    .catch(error=>console.log(error));*/
  }

  loginWithFacebook(){
    this.auth.loginWithFacebook()
      .then(
        async response => {
          const user = new Usuario(response.user.uid, response.user.displayName, response.user.email,response.user.photoURL, 'normal');
          await this.usarioSerive.getUser(user.id).then(async response=>{
            if (response.exists()) {
              //console.log("Document data:", response.data());
              const tem = response.data();
              const userTem = new Usuario(tem.id,tem.nombre,tem.email,tem.fotoPerfil,tem.rol);
              this.usarioSerive.setUser(userTem);
            } else {
              // doc.data() will be undefined in this case
              //console.log("No such document!");
              await this.usarioSerive.addUser(user);
              this.usarioSerive.setUser(user);
            }
          })
          .catch(error=>console.log(error));
          this.snackBar.openFromComponent(AvisoComponent, {
            duration: 3000,
            data: "Ha iniciado sesión como "+ user.nombre,
          });
          this.router.navigate(['bienvenido']);
        }
      )
    .catch(error=>console.log(error));
  }

}
