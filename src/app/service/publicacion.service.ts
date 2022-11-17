import { EventEmitter, Injectable } from "@angular/core";
import { Publicacion } from "../model/publicacion.model";

@Injectable({ providedIn: 'root' })
export class PublicacionService{
    listChangedEvent: EventEmitter<Publicacion[]> = new EventEmitter();
    listaPublicaciones : Publicacion[] = [
        new Publicacion("PUB0","Esta es una imagen subida", new Date, new Date("2019-01-16"), new Date, "foto", "../../assets/test.jpeg", true, "leyes-y-reglamentos"),
        new Publicacion("PUB1","Este es un video subido", new Date, new Date, new Date, "video","./../../assets/test.mp4",false, "leyes-y-reglamentos"),
        new Publicacion("PUB2","Imagen insertada con un link", new Date, new Date, new Date, "foto-src", "https://scontent.fmid1-2.fna.fbcdn.net/v/t39.30808-6/312261399_505274218159299_8083809260020635668_n.png?stp=dst-png_p526x296&_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeELomaGsX5iWECH1u_UuoPDJTCE5KUU39klMITkpRTf2SwZMypFUH6ReW3p1qK4kqAu3yqu9t3zBgsMVREi9l6M&_nc_ohc=cE3LDE501NkAX9jRDTl&_nc_ht=scontent.fmid1-2.fna&oh=00_AT9XtEJ9d51a7Bi9CHXXQ0RRJGjGiGlSZ7E_uDnhJ2wMLw&oe=635637AB", false, "leyes-y-reglamentos"),
        new Publicacion("PUB3","Video insertado con un link", new Date, new Date, new Date, 'iframe', "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FMunicipioSanJacintoAmilpas%2Fvideos%2F601195294979365%2F&show_text=true&width=560&t=0", true,"leyes-y-reglamentos"),
        new Publicacion("PUB4","Video insertado con un link", new Date, new Date, new Date, 'iframe', "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FMunicipioSanJacintoAmilpas%2Fvideos%2F601195294979365%2F&show_text=true&width=560&t=0", true,"casa-de-cultura"),
    ];

    getPublicaciones(){
        return this.listaPublicaciones;
    }

    agregarPublicacion(publicacion: Publicacion){
        this.listaPublicaciones.push(publicacion);
    }
}