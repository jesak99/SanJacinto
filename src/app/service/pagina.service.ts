import { EventEmitter, Injectable } from "@angular/core";
import { Pagina } from "../model/pagina.model";

@Injectable({ providedIn: 'root' })
export class PaginaService{
    listChangedEvent: EventEmitter<Pagina[]> = new EventEmitter();
    listaPaginas : Pagina[] = [
        new Pagina("leyes-y-reglamentos","Leyes y Reglamentos","Conoce sobre las layes y reglamentos de nuestro municipio","https://i0.wp.com/lopezdoriga.com/wp-content/uploads/2018/11/identidad-gobierno-federal.jpg?fit=1200%2C645&ssl=1"),
        new Pagina("seguridad","Seguridad","Conoce la seguridad de nuestro gobierno","https://gobiernosanjacintoamilpas.com.mx/wp-content/uploads/2022/04/fondo-seguridad.jpg"),
        new Pagina("casa-de-cultura","Casa de Cultura","Heberto Castillo","https://scontent.fmid1-3.fna.fbcdn.net/v/t39.30808-6/310558543_175222661750865_3251193919566295878_n.jpg?stp=dst-jpg_s960x960&_nc_cat=109&ccb=1-7&_nc_sid=e3f864&_nc_ohc=Stdet6VUoQkAX_Ui5Sm&_nc_ht=scontent.fmid1-3.fna&oh=00_AT9-YaR7WXwzASdGQ6MgsuNxmNk_10YxeEleivECtWiUnQ&oe=63437BB7"),
        new Pagina("comunicacion","Comunicación","Actividades realizadas","https://gobiernosanjacintoamilpas.com.mx/wp-content/uploads/2022/06/foto-fondo-01-2.jpg"),
    ];

    getPaginas(){
        return this.listaPaginas;
    }

    getPagina(id : string){
        return this.listaPaginas.find(x => x.id == id);
    }

    agregarPagina(pagina: Pagina){
        this.listaPaginas.push(pagina);
    }

    /**
    getUsers(){
        return this.listOfUsers;
    }

    addUser(user : User){
        this.listOfUsers.push(user);
    }

    setUsers(listOfUsers: User[]){
		this.listOfUsers = listOfUsers;
		this.listChangedEvent.emit(listOfUsers);
	}

    getNameUser(){
        return this.name;
    }

    existe(email : string){
        var estado = false;
        this.listOfUsers.forEach(user => {
            if(user.email == email){
                estado = true;
            }
        });
        return estado;
    }

    getUser(email : string, password : string){
        var estado = false;
        this.listOfUsers.forEach(user => {
            if(user.email == email && user.password == password){
                estado = true;
                this.name = user.name;
            }
        });
        return estado;
    } */
}