export class Solicitud{
    constructor(
        public codigo: string,
        public fecha: Date,
        public asunto: string,
        public nombre: string,
        public apellidoPaterno: string,
        public apellidoMaterno: string,
        public calle: string,
        public numExterior: string,
        public numInterior: string,
        public colonia: string,
        public telefono: string,
        public email: string,
        public solicitud: string,
        public estado: boolean
    ){}
}