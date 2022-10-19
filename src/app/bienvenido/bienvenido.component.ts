import { Component, OnInit } from '@angular/core';

export interface Destacado {
  index: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  colorFondo: string;
  class: string;
}

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent implements OnInit {
  r=13;
  g=114;
  b=103;

  listaEncabezado : Destacado[]=[
    {index:0,titulo:"Bienvenido",descripcion: "Te damos la bienvenida a nuestro sitio web", imagen:"./assets/banner-2.png", colorFondo:"#b00b5e",class:'active'},
    {index:1,titulo:"Cultura",descripcion: "Conoce lo que ofrece nuestro municipio", imagen:"./assets/banner-3.png", colorFondo:"#0d7267",class:''},
    {index:2,titulo:"Conocenos",descripcion: "Visita nuestro municipio", imagen:"./assets/banner-4.png", colorFondo:"#3e184d",class:''},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
