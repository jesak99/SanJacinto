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

@Injectable({ providedIn: 'root' })
export class BannerService{

    constructor(private firestore: Firestore){}

    addBanner(banner: Banner){
        const ref = doc(collection(this.firestore, 'banners'));
        return setDoc(ref,{
            codigo: ref.id,
            posicion: banner.posicion,
            imagen: banner.imagen,
            color: banner.color,
            titulo: banner.titulo,
            descripcion: banner.descripcion,
            clase: banner.clase
        })
    }

    updateBanner(banner: Banner){
        const ref = doc(this.firestore, "banners", banner.codigo);
        return updateDoc(ref, {
            posicion: banner.posicion,
            imagen: banner.imagen,
            color: banner.color,
            titulo: banner.titulo,
            descripcion: banner.descripcion,
            clase: banner.clase
        })
    }

    deleteBanner(banner: Banner){
        return deleteDoc(doc(this.firestore, "banners", banner.codigo));
    }

    getCantidadBanners(){
        const ref = collection(this.firestore, "banners");
        return getCountFromServer(ref);
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

    get banners$(): Observable<Banner[]>{
        const ref = collection(this.firestore, 'banners');
        const queryAllPendientes = query(ref, orderBy('posicion','asc'));
        return collectionData(queryAllPendientes) as Observable<Banner[]>;
    }
}