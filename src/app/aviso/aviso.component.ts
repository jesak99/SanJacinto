import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Aviso } from '../model/aviso';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.scss']
})
export class AvisoComponent{
  avisoInfo!: Aviso;

  constructor( 
    @Inject(MAT_SNACK_BAR_DATA) public aviso: Aviso,
  ){}

  ngOnInit(): void {
    this.avisoInfo=this.aviso;
  }
}
