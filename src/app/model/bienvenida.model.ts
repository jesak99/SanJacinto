import { Banner } from "./banner.model";
import { Integrantes } from "./integrantes.model";

export class Bienvenida{
    constructor(
        public banners : Banner[],
        public titulo : string,
        public descripcion : string,
        public imagen_bienvenida : string,
        public imagen_fondo : string,
        public integrantes_gobierno : Integrantes[]
    ){}
}