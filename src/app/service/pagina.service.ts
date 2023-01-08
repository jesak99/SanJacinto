import { EventEmitter, Injectable } from "@angular/core";
import { Firestore, collection, collectionData, docData, setDoc, doc, getFirestore, getDoc, query, where, getDocs, Timestamp } from '@angular/fire/firestore';
import { concatMap, map, Observable, take } from 'rxjs';
import { Pagina } from "../model/pagina.model";
import { Publicacion } from "../model/publicacion.model";

@Injectable({ providedIn: 'root' })
export class PaginaService{
    pagina:string='casa-de-cultura';

    constructor(private firestore: Firestore){}

    setPagina(pagina:string){
        this.pagina = pagina;
    }

    /**   */
    get allPaginas$(): Observable<Pagina[]> {
        const ref = collection(this.firestore, 'paginas');
        const queryAll = query(ref, where('id','!=','bienvenido'));
        return collectionData(queryAll) as Observable<Pagina[]>;
    }

    updatePag(pagina: Pagina){
        const convertir = {
            toFirestore: (pagina: Pagina) => {
                return {
                    id: pagina.id,
                    nombre : pagina.nombre,
                    descripcion : pagina.descripcion,
                    fondoEncabezado : pagina.fondoEncabezado,
                    fondoPagina : pagina.fondoPagina
                };
            },
            fromFirestore: (snapshot: any, options: any) => {
                const data = snapshot.data(options);
                return new Pagina(
                    pagina.id,
                    data.nombre,
                    data.descripcion,
                    data.fondoEncabezado,
                    data.fondoPagina,
                );
            }
        };

        const upPag = doc(this.firestore, 'paginas', pagina.id).withConverter(convertir);
        return setDoc(upPag, pagina);
    }

    getPag(id: string){
        const convertir = {
            toFirestore: (pagina: Pagina) => {
                return {
                    id: pagina.id,
                    nombre : pagina.nombre,
                    descripcion : pagina.descripcion,
                    fondoEncabezado : pagina.fondoEncabezado,
                    fondoPagina : pagina.fondoPagina
                };
            },
            fromFirestore: (snapshot: any, options: any) => {
                const data = snapshot.data(options);
                return new Pagina(
                    data.id,
                    data.nombre,
                    data.descripcion,
                    data.fondoEncabezado,
                    data.fondoPagina,
                );
            }
        };

        const docRef = doc(this.firestore, "paginas", id).withConverter(convertir);
        return getDoc(docRef);
    }

    get pagina$(): Observable<Pagina|null>{
        const ref = doc(this.firestore, 'paginas', 'bienvenido');
        return docData(ref) as Observable<Pagina>;
    }

    get getPag$(): Observable<Pagina|null>{
        const ref = doc(this.firestore, 'paginas', this.pagina);
        return docData(ref) as Observable<Pagina>;
    }
}