import { Injectable } from "@angular/core";
import { 
    Firestore, 
    collection, 
    setDoc, 
    doc, 
    query, 
    updateDoc, 
    collectionData,
    getCountFromServer,
    deleteDoc,
    getDocs,
    orderBy
} from '@angular/fire/firestore';
import { Observable } from "rxjs";
import { Banner } from "../model/banner.model";
import { Integrantes } from "../model/integrantes.model";

@Injectable({ providedIn: 'root' })
export class IntegranteService{

    constructor(private firestore: Firestore){}

    addIntegrante(integrante: Integrantes){
        const ref = doc(collection(this.firestore, 'integrantes'));
        return setDoc(ref,{
            codigo: ref.id,
            nombre: integrante.nombre,
            puesto: integrante.puesto,
            foto: integrante.foto,
            facebook: integrante.facebook,
            twitter: integrante.twitter,
            telefono: integrante.telefono,
            email: integrante.email
        })
    }

    updateIntegrante(integrante: Integrantes){
        const ref = doc(this.firestore, "integrantes", integrante.codigo);
        return updateDoc(ref, {
            nombre: integrante.nombre,
            puesto: integrante.puesto,
            foto: integrante.foto,
            facebook: integrante.facebook,
            twitter: integrante.twitter,
            telefono: integrante.telefono,
            email: integrante.email
        })
    }

    deleteIntegrante(integrante: Integrantes){
        return deleteDoc(doc(this.firestore, "integrantes", integrante.codigo));
    }

    getBanners() {
        const bannerConverter = {
            toFirestore: (banner: Banner) => {
                return {
                    posicion: banner.posicion,
                    imagen: banner.imagen,
                    color: banner.color,
                    titulo: banner.titulo,
                    descripcion: banner.descripcion,
                    clase: banner.clase
                };
            },
            fromFirestore: (snapshot: any, options: any) => {
                const data = snapshot.data(options);
                return new Banner(data.codigo, data.posicion, data.imagen, data.color, data.titulo, data.descripcion, data.clase);
            }
        };

        const ref = collection(this.firestore, 'banners');
        const queryP = query(ref, orderBy('posicion','asc'));

        return getDocs(queryP.withConverter(bannerConverter));
    }

    get integrantes$(): Observable<Integrantes[]>{
        const ref = collection(this.firestore, 'integrantes');
        const queryAllPendientes = query(ref, orderBy('puesto','desc'));
        return collectionData(queryAllPendientes) as Observable<Integrantes[]>;
    }

    cantidadIntegrantes(){
        const ref = collection(this.firestore, "integrantes");
        return getCountFromServer(ref);
    }
}