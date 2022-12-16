import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

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
export class CuentaComponent {
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

}
