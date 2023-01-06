import { Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Integrantes } from 'src/app/model/integrantes.model';
import { BienvenidaService } from 'src/app/service/bienvenida.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { FormIntegranteComponent } from '../form-integrante/form-integrante.component';

@Component({
  selector: 'app-card-usuario',
  templateUrl: './card-usuario.component.html',
  styleUrls: ['./card-usuario.component.scss']
})
export class CardUsuarioComponent implements OnInit {
  @Input() integrante !: Integrantes;
  usuario$ = this.usuarioService.currentUserProfile$;

  constructor(
    public dialog: MatDialog,
    private bienvenidaService: BienvenidaService,
    private usuarioService: UsuarioService
  ) { }

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
