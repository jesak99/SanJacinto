import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Solicitud } from 'src/app/model/solicitud';

@Component({
  selector: 'app-card-solicitud',
  templateUrl: './card-solicitud.component.html',
  styleUrls: ['./card-solicitud.component.scss']
})
export class CardSolicitudComponent implements OnInit{
  solicitudIn!: Solicitud;
  text !: string;

  constructor(
    public dialogRef: MatDialogRef<CardSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public solicitud: Solicitud
  ){}

  ngOnInit(): void {
    if(this.solicitud!=null){
      console.log(this.solicitud)
      this.solicitudIn = this.solicitud;

      const text = document.getElementById("text");
      text!.innerText = this.solicitudIn.solicitud;
      this.text = this.solicitudIn.solicitud.replace(/\n/g,"<br>");
    }
  }

}
