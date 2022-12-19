export class Publicacion{
    constructor(
        public id : string,
        public descripcion : string,
        public duracion : string,
        public fecha_pub : Date,
        public fecha_inicio : Date | null,
        public fecha_fin : Date | null,
        public tipo_pub : string,
        public formato : string,
        public multimedia : string,
        public oculto: boolean,
        public pagina_id : string
    ){}
}