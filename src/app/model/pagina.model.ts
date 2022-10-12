import { Publicacion } from "./publicacion.model";

export class Pagina{
    constructor(
        public id : string,
        public nombre : string,
        public descripcion : string,
        public fondo : string,
        //public publicaciones : Publicacion[]
    ){}
}