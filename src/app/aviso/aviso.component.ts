import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.scss']
})
export class AvisoComponent implements OnInit{
  texto: string='';

  constructor( 
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
  ){}

  ngOnInit(): void {
    this.texto=this.data;
  }
}
