export class Usuario{
    constructor(
        public id : string,
        public nombre : string|null,
        public email : string|null,
        public fotoPerfil : string|null,
        public rol : string|null
    ){}
}