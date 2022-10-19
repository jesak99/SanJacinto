export class Publicacion{
    constructor(
        //public id : string,
        public descripcion : string,
        public fecha_pub : Date,
        public fecha_inicio : Date,
        public fecha_fin : Date,
        public tipo_pub : string,
        public multimedia : string,
        public oculto: boolean,
        public pagina_id : string
    ){}
}