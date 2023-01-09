import { Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Integrantes } from 'src/app/model/integrantes.model';
import { IntegranteService } from 'src/app/service/integrantes.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { FormIntegranteComponent } from '../form-integrante/form-integrante.component';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';

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
    private usuarioService: UsuarioService,
    private integranteService: IntegranteService,
    private snackBar: MatSnackBar
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

  async deleteIntegrante(integrante: Integrantes){
    this.integranteService.deleteIntegrante(integrante).then(response=>{
      this.snackBar.openFromComponent(AvisoComponent, {
        duration: 3000,
        data: {
          texto: "Se ha eliminado el integrante",
          clase: "toast-warning",
          icono: "info",
        },
      });
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
