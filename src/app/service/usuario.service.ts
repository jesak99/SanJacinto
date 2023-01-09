import { EventEmitter, Injectable } from "@angular/core";
import { 
    Firestore, 
    collection, 
    docData, 
    setDoc, 
    doc, 
    getDoc, 
    query, 
    getDocs, 
    updateDoc, 
    collectionData 
} from '@angular/fire/firestore';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import { Usuario } from "../model/usuario.model";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class UsuarioService {

    constructor(private auth: AuthService, private firestore: Firestore) { }

    addUser(user: Usuario) {
        return setDoc(doc(this.firestore, 'usuarios', user.id), {
            id: user.id,
            email: user.email,
            fotoPerfil: user.fotoPerfil,
            nombre: user.nombre,
            rol: user.rol,
        });
    }

    updateRol(idUsuario: string, rol: string){
        const refUsuario = doc(this.firestore, "usuarios", idUsuario);
        return updateDoc(refUsuario, {
            rol: rol
        });
    }

    getUser(uid: string) {
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

        const docRef = doc(this.firestore, "usuarios", uid).withConverter(userConverter);
        return getDoc(docRef);
    }

    getUsers() {
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

        return getDocs(collection(this.firestore, "usuarios").withConverter(userConverter));
    }

    get allUsers$(): Observable<Usuario[]> {
        const ref = collection(this.firestore, 'usuarios');
        const queryAll = query(ref);
        return collectionData(queryAll) as Observable<Usuario[]>;
    }

    get currentUserProfile$(): Observable<Usuario | null> {
        return this.auth.currentUser$.pipe(
          switchMap((user) => {
            if (!user?.uid) {
              return of(null);
            }
    
            const ref = doc(this.firestore, 'usuarios', user?.uid);
            return docData(ref) as Observable<Usuario>;
          })
        );
    }
    
}