import { EventEmitter, Injectable } from "@angular/core";
import { Principal } from "../model/principal.model";
import { 
    Firestore,
    docData, 
    setDoc, 
    doc, 
    getDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PrincipalService {
    newInfo: EventEmitter<Principal> = new EventEmitter();
    datosPrincipales!: Principal;

    constructor(private firestore: Firestore) { }

    setInfo(info: Principal){
        this.datosPrincipales = info;
        this.newInfo.emit(this.datosPrincipales);
    }

    getInfoLocal(){
        return this.datosPrincipales;
    }

    getInfo(){
        const principalConverter = {
            toFirestore: (infoPri: Principal) => {
                return {
                    frase_izq: infoPri.frase_izq,
                    frase_der: infoPri.frase_der,
                    frase_inf: infoPri.frase_inf,
                    icono_enc: infoPri.icono_enc,
                    icono_pri: infoPri.icono_pri,
                    tema_pagi: infoPri.tema_pagi,
                    horario_1: infoPri.horario_1,
                    horario_2: infoPri.horario_2,
                    telefono1: infoPri.telefono1,
                    telefono2: infoPri.telefono2,
                    email1: infoPri.email1,
                    email2: infoPri.email2,
                    direccion: infoPri.direccion,
                    direccion_link: infoPri.direccion_link,
                    facebook: infoPri.facebook,
                    facebook_link: infoPri.facebook_link,
                    twitter: infoPri.twitter,
                    twitter_link: infoPri.twitter_link,
                    instagram: infoPri.instagram,
                    instagram_link: infoPri.instagram_link,
                    youtube: infoPri.youtube,
                    youtube_link: infoPri.youtube_link
                };
            },
            fromFirestore: (snapshot: any, options: any) => {
                const data = snapshot.data(options);
                return new Principal(
                    data.frase_izq,
                    data.frase_der,
                    data.frase_inf,
                    data.icono_enc,
                    data.icono_pri,
                    data.tema_pagi,
                    data.horario_1,
                    data.horario_2,
                    data.telefono1,
                    data.telefono2,
                    data.email1,
                    data.email2,
                    data.direccion,
                    data.direccion_link,
                    data.facebook,
                    data.facebook_link,
                    data.twitter,
                    data.twitter_link,
                    data.instagram,
                    data.instagram_link,
                    data.youtube,
                    data.youtube_link
                );
            }
        };
        const docRef = doc(this.firestore, "informacionPrincipal", 'principal').withConverter(principalConverter);
        return getDoc(docRef);
    }
 
    updateInfoDatabase(info: Principal){
        const principalConverter = {
            toFirestore: (infoPri: Principal) => {
                return {
                    frase_izq: infoPri.frase_izq,
                    frase_der: infoPri.frase_der,
                    frase_inf: infoPri.frase_inf,
                    icono_enc: infoPri.icono_enc,
                    icono_pri: infoPri.icono_pri,
                    tema_pagi: infoPri.tema_pagi,
                    horario_1: infoPri.horario_1,
                    horario_2: infoPri.horario_2,
                    telefono1: infoPri.telefono1,
                    telefono2: infoPri.telefono2,
                    email1: infoPri.email1,
                    email2: infoPri.email2,
                    direccion: infoPri.direccion,
                    direccion_link: infoPri.direccion_link,
                    facebook: infoPri.facebook,
                    facebook_link: infoPri.facebook_link,
                    twitter: infoPri.twitter,
                    twitter_link: infoPri.twitter_link,
                    instagram: infoPri.instagram,
                    instagram_link: infoPri.instagram_link,
                    youtube: infoPri.youtube,
                    youtube_link: infoPri.youtube_link
                };
            },
            fromFirestore: (snapshot: any, options: any) => {
                const data = snapshot.data(options);
                return new Principal(
                    data.frase_izq,
                    data.frase_der,
                    data.frase_inf,
                    data.icono_enc,
                    data.icono_pri,
                    data.tema_pagi,
                    data.horario_1,
                    data.horario_2,
                    data.telefono1,
                    data.telefono2,
                    data.email1,
                    data.email2,
                    data.direccion,
                    data.direccion_link,
                    data.facebook,
                    data.facebook_link,
                    data.twitter,
                    data.twitter_link,
                    data.instagram,
                    data.instagram_link,
                    data.youtube,
                    data.youtube_link
                );
            }
        };

        const userRef = doc(this.firestore,'informacionPrincipal', 'principal').withConverter(principalConverter);
        return setDoc(userRef, info);
    }

    get currentInformation$(): Observable<Principal | null> {
        const ref = doc(this.firestore, 'informacionPrincipal', 'principal');
        return docData(ref) as Observable<Principal>;
    }
}