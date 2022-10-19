import { EventEmitter, Injectable } from "@angular/core";
import { Pagina } from "../model/pagina.model";

@Injectable({ providedIn: 'root' })
export class PaginaService{
    listChangedEvent: EventEmitter<Pagina[]> = new EventEmitter();
    listaPaginas : Pagina[] = [
        new Pagina("leyes-y-reglamentos","Leyes y Reglamentos","Conoce sobre las layes y reglamentos de nuestro municipio","https://i0.wp.com/lopezdoriga.com/wp-content/uploads/2018/11/identidad-gobierno-federal.jpg?fit=1200%2C645&ssl=1","../../assets/image832.png"),
        new Pagina("seguridad","Seguridad","Conoce la seguridad de nuestro gobierno","https://gobiernosanjacintoamilpas.com.mx/wp-content/uploads/2022/04/fondo-seguridad.jpg","../../assets/image832.png"),
        new Pagina("casa-de-cultura","Casa de Cultura","Heberto Castillo","../../assets/casaCulturaFondo.jpeg","../../assets/image832.png"),
        new Pagina("comunicacion","Comunicación","Actividades realizadas","https://gobiernosanjacintoamilpas.com.mx/wp-content/uploads/2022/06/foto-fondo-01-2.jpg","../../assets/image832.png"),
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

    updatePagina(id: string, pagina: Pagina){
        this.listaPaginas[this.findPagina(id)]=pagina;
    }

    findPagina(id: string){
        for(let i=0; i<this.listaPaginas.length; i++){
            if(id==this.listaPaginas[i].id)
                return i;
        }
        return 0;
    }
}