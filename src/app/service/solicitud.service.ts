import { EventEmitter, Injectable } from "@angular/core";
import { Firestore, collection, addDoc, setDoc, doc, getFirestore, getDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Solicitud } from "../model/solicitud.model";

@Injectable({ providedIn: 'root' })
export class SolicitudService {

    constructor(private firestore: Firestore) { }

    addSolicitud(solicitud: Solicitud){
        const solicitudConverter = {
            toFirestore: (solicitud : Solicitud) => {
                return {
                    codigo: solicitud.codigo,
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
    }

}