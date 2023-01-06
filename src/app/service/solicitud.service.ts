import { EventEmitter, Injectable } from "@angular/core";
import { 
    addDoc,
    Firestore, 
    collection, 
    docData, 
    setDoc, 
    doc, 
    getDoc, 
    query, 
    getDocs, 
    updateDoc, 
    collectionData 
} from '@angular/fire/firestore';
import { Solicitud, SolicitudTemp } from "../model/solicitud";
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import { orderBy, Timestamp, where } from "firebase/firestore";

@Injectable({ providedIn: 'root' })
export class SolicitudService {

    constructor(private firestore: Firestore) { }

    /*
    addSolicitud(solicitud: Solicitud){
        const solicitudConverter = {
            toFirestore: (solicitud : Solicitud) => {
                return {
                    codigo: solicitud.id,
                    fecha: solicitud.fecha,
                    asunto: solicitud.asunto,
                    nombre: solicitud.nombre,
                    apellidoPaterno: solicitud.apellidoPaterno,
                    apellidoMaterno: solicitud.apellidoMaterno,
                    calle: solicitud.calle,
                    numExterior: solicitud.numExterior,
                    numInterior: solicitud.numInterior,
                    colonia: solicitud.colonia,
                    telefono: solicitud.telefono,
                    email: solicitud.email,
                    solicitud: solicitud.solicitud
                };
            },
            fromFirestore: (snapshot: any, options: any) => {
                const data = snapshot.data(options);
                return new Solicitud(
                    data.id,
                    data.fecha,
                    data.asunto,
                    data.nombre,
                    data.apellidoPaterno,
                    data.apellidoMaterno,
                    data.calle,
                    data.numExterior,
                    data.numInterior,
                    data.colonia,
                    data.telefono,
                    data.email,
                    data.solicitud,
                    data.estado
                );
            }
        };

        return addDoc(collection(this.firestore, "solicitudes"), {
            fecha: solicitud.fecha,
            asunto: solicitud.asunto,
            nombre: solicitud.nombre,
            apellidoPaterno: solicitud.apellidoPaterno,
            apellidoMaterno: solicitud.apellidoMaterno,
            calle: solicitud.calle,
            numExterior: solicitud.numExterior,
            numInterior: solicitud.numInterior,
            colonia: solicitud.colonia,
            telefono: solicitud.telefono,
            email: solicitud.email,
            solicitud: solicitud.solicitud,
            estado: solicitud.estado
        });
    }*/

    addSolicitud(solicitud: SolicitudTemp) : Observable<any>{
        const today = Timestamp.fromDate(new Date());
        const ref = collection(this.firestore, 'solicitudes');
        return  from(addDoc(ref, {
            fecha: today,
            asunto: solicitud.asunto,
            nombre: solicitud.nombre,
            apellidoPaterno: solicitud.apellidoPaterno,
            apellidoMaterno: solicitud.apellidoMaterno,
            calle: solicitud.calle,
            numExterior: solicitud.numExterior,
            numInterior: solicitud.numInterior,
            colonia: solicitud.colonia,
            telefono: solicitud.telefono,
            email: solicitud.email,
            solicitud: solicitud.solicitud,
            estado: false
        }));
    }

    get allSolicitudesPendientes$(): Observable<Solicitud[]> {
        const ref = collection(this.firestore, 'solicitudes');
        const queryAllPendientes = query(ref, where('estado','==',false));
        return collectionData(queryAllPendientes) as Observable<Solicitud[]>;
    }

    get allSolicitudesAtendidas$(): Observable<Solicitud[]> {
        const ref = collection(this.firestore, 'solicitudes');
        const queryAllAtendidas = query(ref, where('estado', '==', true));
        return collectionData(queryAllAtendidas) as Observable<Solicitud[]>;
    }

}