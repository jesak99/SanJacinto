import { EventEmitter, Injectable } from "@angular/core";
import { Principal } from "../model/principal.model";

@Injectable({ providedIn: 'root' })
export class PrincipalService{
    newInfo: EventEmitter<Principal> = new EventEmitter();
    datosPrincipales : Principal = new Principal(
        "H. Ayuntamiento de San Jacinto Amilpas",
        "Tiempos de Cambio y Bienestar",
        "Gobierno Municipal de San Jacinto Amilpas | 2022-2024",
        "../../assets/logoSoloImg.png",
        "../../assets/logoPrincipal.png",
        false,
        "Lun.-Vie. 09:00-17:00 hrs",
        "Sab. 09:00-14:00 hrs",
        "9515242814",
        "",
        "sanjacintoamilpas2022@gmail.com",
        "sanjacinto2022.2024@gmail.com",
        "Independencia #1, San Jacinto Amilpas, Oaxaca. C.P. 68285", 
        "https://goo.gl/maps/SMoYL5CUTSFqziM39",
        "@MunicipioSanJacintoAmilpas",
        "https://www.facebook.com/MunicipioSanJacintoAmilpas",
        "",
        "",
        "@ayuntamiento_sja",
        "https://www.instagram.com/ayuntamiento_sja/",
        "Municipio San Jacinto Amilpas 2022",
        "https://www.youtube.com/channel/UCs7OpQZELz6FyAzZ3nYixkw",
    );

    getInfo(){
        return this.datosPrincipales;
    }

    updateInfo(info : Principal){
        this.datosPrincipales=info;
        this.newInfo.emit(this.datosPrincipales);
    }
}