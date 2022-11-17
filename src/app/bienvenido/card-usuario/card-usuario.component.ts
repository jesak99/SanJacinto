import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Integrantes } from 'src/app/model/integrantes.model';
import { BienvenidaService } from 'src/app/service/bienvenida.service';
import { FormIntegranteComponent } from '../form-integrante/form-integrante.component';

@Component({
  selector: 'app-card-usuario',
  templateUrl: './card-usuario.component.html',
  styleUrls: ['./card-usuario.component.scss']
})
export class CardUsuarioComponent implements OnInit {
  @Input() integrante !: Integrantes;

  constructor(public dialog: MatDialog, private bienvenidaService: BienvenidaService) { }

  ngOnInit(): void {
  }

  openEdit(integrante:Integrantes){
    const dialogRef = this.dialog.open(FormIntegranteComponent, {
      data: {
        codigo: integrante.codigo,
        foto: integrante.foto,
        nombre: integrante.nombre,
        puesto: integrante.puesto,
        facebook: integrante.facebook,
        twitter: integrante.twitter,
        telefono: integrante.telefono,
        email: integrante.email
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteIntegrante(integrante: Integrantes){
    this.bienvenidaService.deleteIntegrante(integrante);
  }

}
