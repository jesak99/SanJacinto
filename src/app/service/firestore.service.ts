import { EventEmitter, Injectable } from "@angular/core";
import { Firestore, collection, addDoc, setDoc, doc, getFirestore, getDoc, query, where, getDocs } from '@angular/fire/firestore';
//import { collection } from "firebase/firestore";
import { Usuario } from "../model/usuario.model";

@Injectable({ providedIn: 'root' })
export class FiresoreService {

    constructor(private firestore: Firestore) { }

    //Convertidores

    addUser(user: Usuario){
        const userConverter = {
            toFirestore: (usuario: Usuario) => {
                return {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    fotoPerfil: usuario.fotoPerfil,
                    rol: usuario.rol
                };
            },
            fromFirestore: (snapshot: any, options: any) => {
                const data = snapshot.data(options);
                return new Usuario(data.id, data.nombre, data.email, data.fotoPerfil, data.rol);
            }
        };

        const userRef = doc(this.firestore,'usuarios', user.id).withConverter(userConverter);
        return setDoc(userRef, user);
    }

}