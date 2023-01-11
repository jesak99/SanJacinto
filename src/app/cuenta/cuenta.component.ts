import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../service/usuario.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

interface Colonia {
  nombre: string;
}

interface coloniaGroup {
  disabled?: boolean;
  nombre: string;
  colonia: Colonia[];
}

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit, AfterViewInit{
  public imagePath?: string;
  public pathImg1!: File|null;
  imgURL: any;
  public message?: string;

  coloniaControl = new FormControl('');
  coloniaGroups: coloniaGroup[] = [
    {
      nombre: 'A',
      colonia: [
        { nombre: 'Alhelíes'},
        { nombre: 'Antequera'},
        { nombre: 'Arbolada Brenamiel'},
        { nombre: 'Azteca'},
      ],
    },
    {
      nombre: 'B',
      colonia: [
        { nombre: 'Bugambilias'},
      ],
    },
    {
      nombre: 'C',
      colonia: [
        { nombre: 'Camino Real'},
        { nombre: 'Cuauhtémoc Cárdenas Solórzano'},
      ],
    },
    {
      nombre: 'E',
      colonia: [
        { nombre: 'El Arenal'},
        { nombre: 'Emiliano Zapata'},
      ],
    },
    {
      nombre: 'G',
      colonia: [
        { nombre: 'Granjas y Huertos Brenamiel'},
      ],
    },
    {
      nombre: 'H',
      colonia: [
        { nombre: 'Heberto Castillo'},
      ],
    },
    {
      nombre: 'J',
      colonia: [
        { nombre: 'Jardines de La Primavera'},
      ],
    },
    {
      nombre: 'L',
      colonia: [
        { nombre: 'La República'},
        { nombre: 'Los Angeles'},
        { nombre: 'Los Duraznos'},
        { nombre: 'Los Girasoles'},
        { nombre: 'Los Jacintos'},
        { nombre: 'Los Naranjos'},
      ],
    },
    {
      nombre: 'N',
      colonia: [
        { nombre: 'Nuevo México'},
      ],
    },
    {
      nombre: 'O',
      colonia: [
        { nombre: 'Orquideas'},
      ],
    },
    {
      nombre: 'P',
      colonia: [
        { nombre: 'Pinos Esmeralda'},
        { nombre: 'Pintores I, II y III Etapa'},
      ],
    },
    {
      nombre: 'R',
      colonia: [
        { nombre: 'Real San Jacinto'},
        { nombre: 'Residencial San Jacinto'},
        { nombre: 'Residencial Zaachila'},
      ],
    },
    {
      nombre: 'S',
      colonia: [
        { nombre: 'San Antonio'},
        { nombre: 'San Jacinto Amilpas'},
        { nombre: 'Santa Cruz'},
        { nombre: 'Santo Domingo'},
        { nombre: 'Sauces'},
        { nombre: 'Sharon'},
      ],
    },
    {
      nombre: 'T',
      colonia: [
        { nombre: 'Tulipanes'},
      ],
    },
    {
      nombre: 'Y',
      colonia: [
        { nombre: 'Yagul'},
      ],
    },
  ];

  profileForm!: FormGroup;

  usuario!: Usuario|null;

  constructor(
    private usuarioService: UsuarioService, 
    private snackBar: MatSnackBar,
    private storage: Storage,
    private authService: AuthService,
    private router: Router
  ){}

  ngAfterViewInit(): void {
    this.usuarioService.currentUserProfile$
      .pipe()
      .subscribe((user) => {
        this.usuario = user;
        this.imgURL = user?.fotoPerfil;
    });

    this.profileForm = new FormGroup({
      nombre: new FormControl(this.usuario?.nombre, [Validators.required]),
      telefono: new FormControl(this.usuario?.telefono, [Validators.pattern("[0-9]{10}$")]),
      calle: new FormControl(this.usuario?.calle),
      numExterior: new FormControl(this.usuario?.numExterior),
      numInterior: new FormControl(this.usuario?.numInterior),
      colonia: new FormControl(this.usuario?.colonia, [Validators.required]),
      email: new FormControl(this.usuario?.email, [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
    this.usuarioService.currentUserProfile$
      .pipe()
      .subscribe((user) => {
        this.usuario = user;
        this.imgURL = user?.fotoPerfil;
        this.ngAfterViewInit();
    });

    this.profileForm = new FormGroup({
      nombre: new FormControl(this.usuario?.nombre, [Validators.required]),
      telefono: new FormControl(this.usuario?.telefono, [Validators.pattern("[0-9]{10}$")]),
      calle: new FormControl(this.usuario?.calle),
      numExterior: new FormControl(this.usuario?.numExterior),
      numInterior: new FormControl(this.usuario?.numInterior),
      colonia: new FormControl(this.usuario?.colonia, [Validators.required]),
      email: new FormControl(this.usuario?.email, [Validators.required, Validators.email])
    });
  }

  async onSubmit(){
    const nombre = this.profileForm.value.nombre;
    const telefono = this.profileForm.value.telefono;
    const calle = this.profileForm.value.calle;
    const numExterior = this.profileForm.value.numExterior;
    const numInterior = this.profileForm.value.numInterior;
    const colonia = this.profileForm.value.colonia;
    const email = this.profileForm.value.email;
    var img;

    if (this.pathImg1 != null) {
      this.snackBar.openFromComponent(AvisoComponent, {
        data: {
          texto: "Subiendo nueva foto de perfil",
          clase: "toast-loading",
          icono: "info",
        },
      });
      const imgRef = ref(this.storage, 'imagenes/' + this.pathImg1.name);

      await uploadBytes(imgRef, this.pathImg1).then((snapshot) => {
      }).catch(error => {
        this.snackBar.openFromComponent(AvisoComponent, {
          duration: 3000,
          data: {
            texto: "Ha ocurrido un error :(",
            clase: "toast-error",
            icono: "error",
          },
        });
      });
      await getDownloadURL(imgRef)
        .then((url) => {
          this.snackBar.openFromComponent(AvisoComponent, {
            duration: 3000,
            data: {
              texto: "Imagen subida con éxito",
              clase: "toast-success",
              icono: "check",
            },
          });
          img = url;
        })
        .catch((error) => {
          this.snackBar.openFromComponent(AvisoComponent, {
            duration: 3000,
            data: {
              texto: "Ha ocurrido un error :(",
              clase: "toast-error",
              icono: "error",
            },
          });
        });
    }else{
      img = this.usuario?.fotoPerfil;
    }

    this.snackBar.openFromComponent(AvisoComponent, {
      data: {
        texto: "Actualizando los datos",
        clase: "toast-loading",
        icono: "info",
      },
    });

    this.pathImg1=null;
    const userTem = new Usuario(this.usuario?.id??'', nombre, email, img??'', telefono, calle, numExterior, numInterior, colonia, this.usuario?.rol??'');

    await this.usuarioService.updateUsuario(userTem).then(response => {
      this.snackBar.openFromComponent(AvisoComponent, {
        duration: 3000,
        data: {
          texto: "Se han actualizado tus datos",
          clase: "toast-success",
          icono: "check",
        },
      });
    }).catch(error => {
      this.snackBar.openFromComponent(AvisoComponent, {
        duration: 3000,
        data: {
          texto: "No se ha podido actualizar la información :(",
          clase: "toast-error",
          icono: "error",
        },
      });
    });
  }

  async deleteUser(){
    this.snackBar.openFromComponent(AvisoComponent, {
      data: {
        texto: "Eliminando perfil ...",
        clase: "toast-loading",
        icono: "info",
      },
    });
    await this.usuarioService.addUserDelete(this.usuario!).then(async response=>{
      await this.authService.deleteUsuario().then(async response=>{
        await this.usuarioService.deleteUsuarioDoc(this.usuario!).then(()=>{
          this.snackBar.openFromComponent(AvisoComponent, {
            duration: 3000,
            data: {
              texto: "Se ha eliminado el perfil",
              clase: "toast-success",
              icono: "check",
            },
          });
          this.router.navigate(["bienvenido"]);
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

  preview(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    this.pathImg1 = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

}
