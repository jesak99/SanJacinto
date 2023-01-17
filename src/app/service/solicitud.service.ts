import { Injectable } from "@angular/core";
import { 
    Firestore, 
    collection, 
    setDoc, 
    doc, 
    query, 
    updateDoc, 
    collectionData
} from '@angular/fire/firestore';
import { Solicitud, SolicitudTemp } from "../model/solicitud";
import { Observable } from 'rxjs';
import { getCountFromServer, orderBy, Timestamp, where } from "firebase/firestore";

@Injectable({ providedIn: 'root' })
export class SolicitudService {

    constructor(private firestore: Firestore) { }

    addSolicitud(solicitud: SolicitudTemp){
        const refSol = doc(collection(this.firestore, "solicitudes"));
        const today = Timestamp.fromDate(new Date());
        return setDoc(refSol, {
            id: refSol.id,
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
        });
    }

    updateSolicitud(solicitud: Solicitud, estado: boolean){
        const refSol = doc(this.firestore, "solicitudes", solicitud.id);
        return updateDoc(refSol, {
            estado: estado
        })
    }

    get allSolicitudesPendientes$(): Observable<Solicitud[]> {
        const ref = collection(this.firestore, 'solicitudes');
        const queryAllPendientes = query(ref, where('estado','==',false), orderBy('fecha','asc'));
        return collectionData(queryAllPendientes) as Observable<Solicitud[]>;
    }

    get allSolicitudesAtendidas$(): Observable<Solicitud[]> {
        const ref = collection(this.firestore, 'solicitudes');
        const queryAllAtendidas = query(ref, where('estado', '==', true), orderBy('fecha','desc'));
        return collectionData(queryAllAtendidas) as Observable<Solicitud[]>;
    }

    solicitudesAtendidas(){
        const ref = collection(this.firestore, 'solicitudes');
        const con = query(ref, where('estado',"==",true));
        return getCountFromServer(con);
    }

    solicitudesPendientes(){
        const ref = collection(this.firestore, 'solicitudes');
        const con = query(ref, where('estado',"==",false));
        return getCountFromServer(con);
    }

}