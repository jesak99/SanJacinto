import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario.model';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';
import { Router } from '@angular/router';

const ROLES: string[] = [
  'Administrador',
  'Habitante',
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = ['id', 'email', 'nombre', 'rol'];
  dataSource: MatTableDataSource<Usuario>;

  usuarios$ = this.userService.allUsers$;

  listUsuarios?: Usuario[]=[];
  selectedRol = ROLES[1];
  roles = ROLES;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService:UsuarioService, 
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.userService.currentUserProfile$
      .pipe()
      .subscribe((user) => {
        if(user?.rol!="Administrador"){
          this.router.navigate(["bienvenido"]);
        }
    });
    this.dataSource = new MatTableDataSource(this.listUsuarios);
  }

  async ngOnInit() {
    await this.userService.getUsers().then(response=>{
      response.forEach((doc) => {
        if (doc.exists()) {
          var userTem = new Usuario(
            doc.id,
            doc.data().nombre,
            doc.data().email,
            doc.data().fotoPerfil,
            doc.data().telefono,
            doc.data().calle,
            doc.data().numExterior,
            doc.data().numInterior,
            doc.data().colonia,
            doc.data().rol
          );
          this.listUsuarios?.push(userTem);
        } else {
          console.log("No such document!");
        }
      });
    }).catch(error=>console.log(error));
    this.dataSource = new MatTableDataSource(this.listUsuarios);
    this.ngAfterViewInit();
    console.log(this.listUsuarios);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async updateRol(id: string,rol: string, usuario:Usuario){
    await this.userService.updateRol(id, rol).then(respose=>{
      this.snackBar.openFromComponent(AvisoComponent, {
        duration: 3000,
        data: {
          texto: usuario.nombre +" ahora es un " + rol,
          clase: "toast-success",
          icono: "check",
        },
      });
    }).catch(error=>
      this.snackBar.openFromComponent(AvisoComponent, {
        duration: 3000,
        data: {
          texto: "Ha ocurrido un error :(",
          clase: "toast-error",
          icono: "error",
        },
      })
    );
  }

}