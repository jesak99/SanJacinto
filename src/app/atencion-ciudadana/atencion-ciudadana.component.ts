import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SolicitudTemp } from '../model/solicitud';
import { SolicitudService } from '../service/solicitud.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';
import { HotToastService } from '@ngneat/hot-toast';

interface Colonia {
  nombre: string;
}

interface coloniaGroup {
  disabled?: boolean;
  nombre: string;
  colonia: Colonia[];
}

@Component({
  selector: 'app-atencion-ciudadana',
  templateUrl: './atencion-ciudadana.component.html',
  styleUrls: ['./atencion-ciudadana.component.scss'],
})
export class AtencionCiudadanaComponent implements OnInit {
  fecha: Date = new Date();

  formSolicitud!: FormGroup;
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

  constructor(
    private solicitudService : SolicitudService,
    private toast: HotToastService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    let asunto = '';
    let nombre = '';
    let apellidoPaterno = '';
    let apellidoMaterno = '';
    let calle = '';
    let numExterior = '';
    let numInterior = '';
    let colonia = '';
    let telefono = '';
    let email = '';
    let solicitud = '';

    this.formSolicitud = new FormGroup({
      asunto: new FormControl(asunto, [Validators.required]),
      nombre: new FormControl(nombre, [Validators.required]),
      apellidoPaterno: new FormControl(apellidoPaterno, [Validators.required]),
      apellidoMaterno: new FormControl(apellidoMaterno, [Validators.required]),
      calle: new FormControl(calle),
      numExterior: new FormControl(numExterior),
      numInterior: new FormControl(numInterior),
      colonia: new FormControl(colonia, [Validators.required]),
      telefono: new FormControl(telefono, [Validators.pattern("[0-9]{10}$")]),
      email: new FormControl(email, [Validators.required, Validators.email]),
      solicitud: new FormControl(solicitud, [Validators.required])
    })
  }

  async onSubmit(){
    const asunto = this.formSolicitud.value.asunto;
    const nombre = this.formSolicitud.value.nombre;
    const apellidoPaterno = this.formSolicitud.value.apellidoPaterno;
    const apellidoMaterno = this.formSolicitud.value.apellidoMaterno;
    const calle = this.formSolicitud.value.calle;
    const numExterior = this.formSolicitud.value.numExterior;
    const numInterior = this.formSolicitud.value.numInterior;
    const colonia = this.formSolicitud.value.colonia;
    const telefono = this.formSolicitud.value.telefono;
    const email = this.formSolicitud.value.email;
    const solicitud = this.formSolicitud.value.solicitud;

    const temp: SolicitudTemp = {
      asunto: asunto,
      nombre: nombre,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      calle: calle,
      numExterior: numExterior,
      numInterior: numInterior,
      colonia: colonia,
      telefono: telefono,
      email: email,
      solicitud: solicitud
    };

    await this.solicitudService.addSolicitud(temp).then(response => {
      this.snackBar.openFromComponent(AvisoComponent, {
        duration: 3000,
        data: {
          texto: "Hemos recibido tu solicitud te contactaremos a la brevedad",
          clase: "toast-success",
          icono: "check",
        },
      });
      this.formSolicitud.reset();
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
  }
}
