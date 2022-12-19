import { EventEmitter, Injectable } from "@angular/core";
import { Publicacion } from "../model/publicacion.model";
import { Firestore, collection, addDoc, setDoc, doc, getFirestore, getDoc, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class PublicacionService{
    listChangedEvent: EventEmitter<Publicacion[]> = new EventEmitter();
    listaPublicaciones : Publicacion[] = [
        new Publicacion("PUB0","Esta es una imagen subida", "Indeterminado",new Date, new Date("2019-01-16"), new Date, "foto", "imagen", "../../assets/test.jpeg", true, "leyes-y-reglamentos"),
        new Publicacion("PUB1","Este es un video subido", "Indeterminado", new Date, new Date, new Date, "video", "video","./../../assets/test.mp4",false, "leyes-y-reglamentos"),
        new Publicacion("PUB2","Imagen insertada con un link", "Indeterminado", new Date, new Date, new Date, "foto-src", "imagen-src","https://scontent.fmid1-2.fna.fbcdn.net/v/t39.30808-6/312261399_505274218159299_8083809260020635668_n.png?stp=dst-png_p526x296&_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeELomaGsX5iWECH1u_UuoPDJTCE5KUU39klMITkpRTf2SwZMypFUH6ReW3p1qK4kqAu3yqu9t3zBgsMVREi9l6M&_nc_ohc=cE3LDE501NkAX9jRDTl&_nc_ht=scontent.fmid1-2.fna&oh=00_AT9XtEJ9d51a7Bi9CHXXQ0RRJGjGiGlSZ7E_uDnhJ2wMLw&oe=635637AB", false, "leyes-y-reglamentos"),
        new Publicacion("PUB3","Video insertado con un link", "Indeterminado", new Date, new Date, new Date, 'iframe', "iframe","https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FMunicipioSanJacintoAmilpas%2Fvideos%2F601195294979365%2F&show_text=true&width=560&t=0", true,"leyes-y-reglamentos"),
        new Publicacion("PUB4","Video insertado con un link", "Indeterminado",new Date, new Date, new Date, 'iframe', "iframe","https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FMunicipioSanJacintoAmilpas%2Fvideos%2F601195294979365%2F&show_text=true&width=560&t=0", true,"casa-de-cultura"),
    ];

    constructor(private firestore: Firestore){}

    getPublicaciones(){
        return this.listaPublicaciones;
    }

    agregarPublicacion(publicacion: Publicacion){
        this.listaPublicaciones.push(publicacion);
    }

    addPublicacion(publicacion: Publicacion){
        return addDoc(collection(this.firestore, "publicaciones"), {
            descripcion : publicacion.descripcion,
            duracion : publicacion.duracion,
            fecha_pub : publicacion.fecha_pub,
            fecha_inicio : publicacion.fecha_inicio,
            fecha_fin : publicacion.fecha_fin,
            tipo_pub : publicacion.tipo_pub,
            formato : publicacion.formato,
            multimedia : publicacion.multimedia,
            oculto: publicacion.oculto,
            pagina_id : publicacion.pagina_id
        });
    }

    getPublicacionesDB() {
        const userConverter = {
            toFirestore: (publicacion: Publicacion) => {
                return {
                    descripcion : publicacion.descripcion,
                    duracion : publicacion.duracion,
                    fecha_pub : publicacion.fecha_pub,
                    fecha_inicio : publicacion.fecha_inicio,
                    fecha_fin : publicacion.fecha_fin,
                    tipo_pub : publicacion.tipo_pub,
                    formato : publicacion.formato,
                    multimedia : publicacion.multimedia,
                    oculto: publicacion.oculto,
                    pagina_id : publicacion.pagina_id
                };
            },
            fromFirestore: (snapshot: any, options: any) => {
                const data = snapshot.data(options);
                return new Publicacion(
                    data.id,
                    data.descripcion,
                    data.duracion,
                    data.fecha_pub,
                    data.fecha_inicio,
                    data.fecha_fin,
                    data.tipo_pub,
                    data.formato,
                    data.multimedia,
                    data.oculto,
                    data.pagina_id
                );
            }
        }
        return getDocs(collection(this.firestore, "publicaciones").withConverter(userConverter));
    }
}