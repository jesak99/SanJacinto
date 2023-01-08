import { Timestamp } from "firebase/firestore";

export class Publicacion {
    constructor(
        public id: string,
        public descripcion: string,
        public duracion: string,
        public fecha_pub: Date & Timestamp,
        public fecha_inicio: Date & Timestamp,
        public fecha_fin: Date & Timestamp,
        public tipo_pub: string,
        public formato: string,
        public multimedia: string,
        public oculto: boolean,
        public pagina_id: string
    ) { }
}

export interface PublicacionTemporal {
    id: string,
    descripcion: string,
    duracion: string,
    fecha_pub: Date,
    fecha_inicio: Date,
    fecha_fin: Date,
    tipo_pub: string,
    formato: string,
    multimedia: string,
    oculto: boolean,
    pagina_id: string
}