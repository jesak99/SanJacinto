import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderComponent } from './header/header.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { FooterComponent } from './footer/footer.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { NuevaPublicacionComponent } from './publicaciones/nueva-publicacion/nueva-publicacion.component';
import { CrearPublicacionComponent } from './publicaciones/crear-publicacion/crear-publicacion.component';
import { CardPublicacionComponent } from './publicaciones/card-publicacion/card-publicacion.component';
import { ContactoComponent } from './contacto/contacto.component';

const routes : Routes=[
  {path: '', redirectTo: '/bienvenido', pathMatch: 'full'},
  {path: 'bienvenido', component: BienvenidoComponent},
  {path: 'contacto', component: ContactoComponent}, 
  {path: 'leyes-y-reglamentos', component: PublicacionesComponent},
  {path: 'seguridad', component: PublicacionesComponent},
  {path: 'casa-de-cultura', component: PublicacionesComponent},
  {path: 'comunicacion', component: PublicacionesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BienvenidoComponent,
    FooterComponent,
    PublicacionesComponent,
    NuevaPublicacionComponent,
    CrearPublicacionComponent,
    CardPublicacionComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatTabsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
