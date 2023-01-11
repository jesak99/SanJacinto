import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AvisoComponent } from 'src/app/aviso/aviso.component';
import { Solicitud } from 'src/app/model/solicitud';
import { SolicitudService } from 'src/app/service/solicitud.service';

@Component({
  selector: 'app-card-solicitud',
  templateUrl: './card-solicitud.component.html',
  styleUrls: ['./card-solicitud.component.scss']
})
export class CardSolicitudComponent implements OnInit{
  solicitudIn!: Solicitud;
  text !: string;

  constructor(
    private snackBar: MatSnackBar,
    private solicitudService: SolicitudService,
    public dialogRef: MatDialogRef<CardSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public solicitud: Solicitud
  ){}

  ngOnInit(): void {
    if(this.solicitud!=null){
      this.solicitudIn = this.solicitud;

      const text = document.getElementById("text");
      text!.innerText = this.solicitudIn.solicitud;
      this.text = this.solicitudIn.solicitud.replace(/\n/g,"<br>");
    }
  }

  async toggle(event: MatSlideToggleChange) {
    this.snackBar.openFromComponent(AvisoComponent, {
      data: {
        texto: "Actualizando el estado",
        clase: "toast-loading",
        icono: "info",
      },
    });
    await this.solicitudService.updateSolicitud(this.solicitudIn, event.checked).then(response=>{
      this.snackBar.openFromComponent(AvisoComponent, {
        duration: 3000,
        data: {
          texto: "Se ha actualizado el estado",
          clase: "toast-success",
          icono: "check",
        },
      });
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

  updateSolicitud(estado:boolean){}

}
