import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatFormFieldModule } from '@angular/material/form-field';
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
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';

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

const routes : Routes=[
  {path: '', pathMatch: 'full', redirectTo: '/bienvenido'},
  {path: 'pagina/:id', component: PublicacionesComponent},
  {path: 'bienvenido', component: BienvenidoComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'acceso', component: AuthComponent},
  {path: 'dashboard', component: DashboardComponent, ...canActivate(()=> redirectUnauthorizedTo(['/acceso']))},
  {path: 'info-pagina', component: InfoPaginaComponent},
  {path: 'notificaciones', component: ModNotificacionesComponent},
  {path: 'usuarios', component: UsuariosComponent} 
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
