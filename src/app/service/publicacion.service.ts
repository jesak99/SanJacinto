import { EventEmitter, Injectable } from "@angular/core";
import { Publicacion } from "../model/publicacion.model";

@Injectable({ providedIn: 'root' })
export class PublicacionService{
    listChangedEvent: EventEmitter<Publicacion[]> = new EventEmitter();
    listaPublicaciones : Publicacion[] = [
        new Publicacion("Esta es una imagen subida", new Date, new Date, new Date, "foto", "https://scontent.fmid1-3.fna.fbcdn.net/v/t39.30808-6/310602583_492580822761972_2291567422932397640_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=730e14&_nc_ohc=N_THXuiQDA4AX8YBQHh&_nc_ht=scontent.fmid1-3.fna&oh=00_AT_iyZFjUcf-X23RIaK4oCpf3fAQlvmdzBY3HY1qfIvsYA&oe=63449423", "leyes-y-reglamentos"),
        new Publicacion("Este es un video subido", new Date, new Date, new Date, "video","./../../assets/test.mp4","leyes-y-reglamentos"),
        new Publicacion("Imagen insertada con un link", new Date, new Date, new Date, "foto-src", "https://scontent.fmid1-4.fna.fbcdn.net/v/t39.30808-6/310839909_492417959444925_1351976808452900793_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=zW-RDVw0UlYAX9WSeBR&tn=S90yGZp3ne1nQvJH&_nc_ht=scontent.fmid1-4.fna&oh=00_AT8a5wFlXn9mZHN2gZJiqKqAw4imOhx7W1E2Xrf3GN0LsA&oe=634A030F","leyes-y-reglamentos"),
        new Publicacion("Video insertado con un link", new Date, new Date, new Date, 'iframe', "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FMunicipioSanJacintoAmilpas%2Fvideos%2F601195294979365%2F&show_text=true&width=560&t=0","leyes-y-reglamentos"),
    ];

    getPublicaciones(){
        return this.listaPublicaciones;
    }

    agregarPublicacion(publicacion: Publicacion){
        this.listaPublicaciones.push(publicacion);
    }
}