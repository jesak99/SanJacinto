import { EventEmitter, Injectable } from "@angular/core";
import { Banner } from "../model/banner.model";
import { Bienvenida } from "../model/bienvenida.model";
import { Integrantes } from "../model/integrantes.model";

@Injectable({ providedIn: 'root' })
export class BienvenidaService{
    newBienvenida: EventEmitter<Bienvenida> = new EventEmitter();
    bienvenida : Bienvenida = new Bienvenida(
        [
            new Banner("BAN0",0,"https://www.oaxaca.gob.mx/wp-content/themes/oaxtwentyone/assets/images/banner-2.png","#b00b5e","Bienvenido","Te damos la bienvenida a nuestro sitio web","active"),
            new Banner("BAN1",1,"./assets/banner-3.png","#0d7267","Cultura","Conoce lo que ofrece nuestro municipio",""),
            new Banner("BAN2",2,"./assets/banner-4.png","#3e184d","Conocenos","Visita nuestro municipio",""),
            new Banner("BAN3",3,"./assets/logoSoloImg.png","#3e184d","","",""),
        ],
        "San Jacinto Amilpas",
        "Es un municipio en la región de los valles centrales, parte central del estado de Oaxaca, México.\nSu nombre significa «Lugar sobre las cementeras», proveniente del náhuatl.\nConoce lo que San Jacinto Amilpas le ofrece culturalmente al Mundo.",
        "https://gobiernosanjacintoamilpas.com.mx/wp-content/uploads/2022/06/foto-fondo-01-2.jpg",
        "../../assets/image832.png",
        [
            new Integrantes("INT0","Gabriela A. Pérez Diaz","Presidente Municipal","../../assets/gaby.jpeg","https://www.facebook.com/GabyDiazPresidenta","https://twitter.com/GabyDiazSJA","",""),
            new Integrantes("INT1","Daniela Cruz Blas","Coordinador de Colonias","https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png","","","",""),
            new Integrantes("INT2","Ricardo Muñoz Olivera","Director de Seguridad Pública","https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png","","","",""),
            new Integrantes("INT3","Irving Hernandez Mendez","Secretario Municipal","https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png","","","",""),
            new Integrantes("INT4","Gabriel Sanchez Luna","Controlador Interno Municipal","https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png","","","",""),
            new Integrantes("INT5","Tomas Olmedo Morales","Sindico Municipal","https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png","","","",""),
            new Integrantes("INT6","Armando Armengol Vargar","Alcalde Municipal","https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png","","","",""),
            new Integrantes("INT7","Marina Daza Robles","Tesorero Municipal","https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png","","","","")
        ]
    );

    getBienvenida(){
        return this.bienvenida;
    }

    getBanners(){
        return this.bienvenida.banners;
    }

    getIntegrantes(){
        return this.bienvenida.integrantes_gobierno;
    }

    addBanner(banner : Banner){
        this.bienvenida.banners.push(banner);
        this.newBienvenida.emit(this.bienvenida);
    }

    addIntegrante(integrante: Integrantes){
        this.bienvenida.integrantes_gobierno.push(integrante);
        this.newBienvenida.emit(this.bienvenida);
    }

    updateBienvenida(titulo:string, descripcion:string, imagen_bienvenida:string, imagen_fondo:string){
        this.bienvenida.titulo=titulo;
        this.bienvenida.descripcion=descripcion;
        this.bienvenida.imagen_bienvenida=imagen_bienvenida;
        this.bienvenida.imagen_fondo=imagen_fondo;
        this.newBienvenida.emit(this.bienvenida);
    }

    updateBanners(banners: Banner[]){
        this.bienvenida.banners = banners;
        this.newBienvenida.emit(this.bienvenida);
    }

    updateIntegrante(integrante: Integrantes){
        this.bienvenida.integrantes_gobierno[this.findIntegrante(integrante.codigo)]=integrante;
        this.newBienvenida.emit(this.bienvenida);
    }

    updateBanner(banner: Banner){
        this.bienvenida.banners[this.findBanner(banner.codigo)]=banner;
        this.newBienvenida.emit(this.bienvenida);
    }

    deleteIntegrante(integrante: Integrantes){
        this.bienvenida.integrantes_gobierno.splice(this.findIntegrante(integrante.codigo), 1);
        this.newBienvenida.emit(this.bienvenida);
    }

    deleteBanner(banner: Banner){
        this.bienvenida.banners.splice(this.findBanner(banner.codigo), 1);
        this.newBienvenida.emit(this.bienvenida);
    }

    findIntegrante(codigo: string){
        for(let i=0; i<this.bienvenida.integrantes_gobierno.length; i++){
            if(codigo==this.bienvenida.integrantes_gobierno[i].codigo)
                return i;
        }
        return 0;
    }
    
    findBanner(codigo: string){
        for(let i=0; i<this.bienvenida.banners.length; i++){
            if(codigo==this.bienvenida.banners[i].codigo)
                return i;
        }
        return 0;
    }
}