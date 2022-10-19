import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

const FRUITS: string[] = [
  'Administrador',
  'Comunicación y difusión',
  'Bienestar social y juventud',
  'Seguridad pública',
  'Casa de cultura',
  'Obras públicas y desarrollo urbano',
  'Juventud y deporte',
  'Usuario normal',
];
const EMAILS: string[] = [
  '17161090@itoaxaca.edu.mx',
  'example_99@gmail.com',
  'hello_world@hotmail.com',
  'hi_123@gmail.com',
  'sanjacintoamilpas2022@gmail.com',
  'sanjacinto2022.2024@gmail.com',
  'juventud_social@hotmail.com',
  'gobierno_2022@hotmail.com',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
[x: string]: any;
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;

  frutas = FRUITS;

  selectedFood = FRUITS[0];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { 
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
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

function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    //progress: Math.round(Math.random() * 100).toString(),
    progress: EMAILS[(Math.round(Math.random() * (EMAILS.length - 1)))],
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}