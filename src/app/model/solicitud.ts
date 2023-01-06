import { Timestamp } from "firebase/firestore";

export interface Solicitud {
    id: string,
    fecha: Date & Timestamp,
    asunto: string,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    calle: string,
    numExterior: string,
    numInterior: string,
    colonia: string,
    telefono: string,
    email: string,
    solicitud: string,
    estado: boolean
}

export interface SolicitudTemp {
    asunto: string,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    calle: string,
    numExterior: string,
    numInterior: string,
    colonia: string,
    telefono: string,
    email: string,
    solicitud: string
}