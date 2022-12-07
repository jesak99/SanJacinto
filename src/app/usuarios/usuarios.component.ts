import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario.model';

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

  listUsuarios?: Usuario[]=[];
  selectedRol = ROLES[1];
  roles = ROLES;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService:UsuarioService) {
    this.dataSource = new MatTableDataSource(this.listUsuarios);
  }

  async ngOnInit() {
    await this.userService.getUsers().then(response=>{
      response.forEach((doc) => {
        if (doc.exists()) {
          var userTem = new Usuario(doc.id,doc.data().nombre,doc.data().email,doc.data().fotoPerfil,doc.data().rol);
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

}