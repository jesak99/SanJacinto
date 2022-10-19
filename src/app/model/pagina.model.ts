import { Publicacion } from "./publicacion.model";

export class Pagina{
    constructor(
        public id : string,
        public nombre : string,
        public descripcion : string,
        public fondoEncabezado : string,
        public fondoPagina : string
        //public publicaciones : Publicacion[]
    ){}
}