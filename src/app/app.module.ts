import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog'; 
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { FooterComponent } from './footer/footer.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { NuevaPublicacionComponent } from './publicaciones/nueva-publicacion/nueva-publicacion.component';
import { CrearPublicacionComponent } from './publicaciones/crear-publicacion/crear-publicacion.component';
import { CardPublicacionComponent } from './publicaciones/card-publicacion/card-publicacion.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfoPaginaComponent } from './info-pagina/info-pagina.component';
import { ModNotificacionesComponent } from './mod-notificaciones/mod-notificaciones.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormPaginaComponent } from './publicaciones/form-pagina/form-pagina.component';
import { FormBienvenidoComponent } from './bienvenido/form-bienvenido/form-bienvenido.component';
import { CardUsuarioComponent } from './bienvenido/card-usuario/card-usuario.component';
import { FormIntegranteComponent } from './bienvenido/form-integrante/form-integrante.component';
import { FormBannerComponent } from './bienvenido/form-banner/form-banner.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AvisoComponent } from './aviso/aviso.component';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { CuentaComponent } from './cuenta/cuenta.component';
import { AtencionCiudadanaComponent } from './atencion-ciudadana/atencion-ciudadana.component';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { MensajesComponent } from './mensajes/mensajes.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { DatePipe } from '@angular/common';
import { DateDisplayPipe } from './pipes/date-display.pipe';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { CardSolicitudComponent } from './solicitudes/card-solicitud/card-solicitud.component';
import { ToastService } from './service/toast.service';

const routes : Routes=[
  {path: '', pathMatch: 'full', redirectTo: '/bienvenido'},
  {path: 'pagina/:id', component: PublicacionesComponent},
  {path: 'bienvenido', component: BienvenidoComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'acceso', component: AuthComponent},
  {path: 'dashboard', component: DashboardComponent, ...canActivate(()=> redirectUnauthorizedTo(['/acceso']))},
  {path: 'info-pagina', component: InfoPaginaComponent, ...canActivate(()=> redirectUnauthorizedTo(['/acceso']))},
  {path: 'notificaciones', component: ModNotificacionesComponent, ...canActivate(()=> redirectUnauthorizedTo(['/acceso']))},
  {path: 'usuarios', component: UsuariosComponent, ...canActivate(()=> redirectUnauthorizedTo(['/acceso']))},
  {path: 'ajustes-cuenta', component: CuentaComponent, ...canActivate(()=> redirectUnauthorizedTo(['/acceso']))},
  {path: 'atencion-ciudadana', component: AtencionCiudadanaComponent},
  {path: 'mensajes', component: MensajesComponent, ...canActivate(()=> redirectUnauthorizedTo(['/acceso']))},
  {path: 'solicitudes', component: SolicitudesComponent, ...canActivate(()=> redirectUnauthorizedTo(['/acceso']))},
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
    ContactoComponent,
    DashboardComponent,
    InfoPaginaComponent,
    ModNotificacionesComponent,
    UsuariosComponent,
    FormPaginaComponent,
    FormBienvenidoComponent,
    CardUsuarioComponent,
    FormIntegranteComponent,
    FormBannerComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    AvisoComponent,
    CuentaComponent,
    AtencionCiudadanaComponent,
    MensajesComponent,
    DateDisplayPipe,
    SolicitudesComponent,
    CardSolicitudComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatFormFieldModule,
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
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideMessaging(() => getMessaging()),
    HotToastModule.forRoot({position: 'bottom-center'})
  ],
  providers: [DatePipe, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
