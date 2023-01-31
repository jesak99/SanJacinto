import { Injectable } from "@angular/core";
import { Publicacion, PublicacionTemporal } from "../model/publicacion.model";
import { 
    Firestore, 
    collection, 
    addDoc, 
    setDoc,
    updateDoc, 
    doc, 
    deleteDoc, 
    query, 
    where, 
    getDocs, 
    collectionData, 
    orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicacionService{
    pagina:string='casa-de-cultura';

    constructor(private firestore: Firestore){}

    setPagina(id: string){
        this.pagina = id;
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

    addPub(publicacion:PublicacionTemporal){
        const pubRef = doc(collection(this.firestore, "publicaciones"));
        return setDoc(pubRef, {
            id: pubRef.id,
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

    updatePublicacion(publicacion: PublicacionTemporal){
        const ref = doc(this.firestore, "publicaciones", publicacion.id);
        return updateDoc(ref, {
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
        })
    }

    deletePublicacion(publicacion: Publicacion){
        return deleteDoc(doc(this.firestore, "publicaciones", publicacion.id));
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

    get publicaciones$(): Observable<Publicacion[]>{
        const ref = collection(this.firestore, 'publicaciones');
        const queryAll = query(ref, where('pagina_id','==',this.pagina), orderBy('fecha_pub','desc'));
        return collectionData(queryAll) as Observable<Publicacion[]>;
    }

    get publicacionesAdmin$(): Observable<Publicacion[]>{
        const ref = collection(this.firestore, 'publicaciones');
        const queryAll = query(ref, where('pagina_id','==',this.pagina), orderBy('fecha_pub','desc'));
        return collectionData(queryAll) as Observable<Publicacion[]>;
    }
}