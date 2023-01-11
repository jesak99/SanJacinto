export class Usuario{
    constructor(
        public id : string,
        public nombre : string|null,
        public email : string|null,
        public fotoPerfil : string|null,
        public telefono : string | null,
        public calle : string | null,
        public numExterior : string | null,
        public numInterior : string | null,
        public colonia : string | null,
        public rol : string|null
    ){}
}