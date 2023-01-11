import { Injectable } from "@angular/core";
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
    collectionData,
    deleteDoc
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

    addUserDelete(user: Usuario){
        return setDoc(doc(this.firestore, 'usuarios_eliminados', user.id), {
            id: user.id,
            email: user.email,
            fotoPerfil: user.fotoPerfil,
            nombre: user.nombre,
            telefono: user.telefono,
            rol: user.rol,
        });
    }

    deleteUsuarioDoc(user: Usuario){
        return deleteDoc(doc(this.firestore, 'usuarios', user.id));
    }

    updateRol(idUsuario: string, rol: string){
        const refUsuario = doc(this.firestore, "usuarios", idUsuario);
        return updateDoc(refUsuario, {
            rol: rol
        });
    }

    updateUsuario(usuario: Usuario){
        const refUsuario = doc(this.firestore, "usuarios", usuario.id);
        return updateDoc(refUsuario, {
            nombre: usuario.nombre, 
            email: usuario.email, 
            fotoPerfil: usuario.fotoPerfil, 
            telefono: usuario.telefono, 
            calle: usuario.calle,
            numExterior: usuario.numExterior,
            numInterior: usuario.numInterior,
            colonia: usuario.colonia
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
                return new Usuario(
                    data.id, 
                    data.nombre, 
                    data.email, 
                    data.fotoPerfil, 
                    data.telefono, 
                    data.calle,
                    data.numExterior,
                    data.numInterior,
                    data.colonia,
                    data.rol
                );
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
                    telefono: usuario.telefono, 
                    calle: usuario.calle,
                    numExterior: usuario.numExterior,
                    numInterior: usuario.numInterior,
                    colonia: usuario.colonia,
                    rol: usuario.rol
                };
            },
            fromFirestore: (snapshot: any, options: any) => {
                const data = snapshot.data(options);
                return new Usuario(
                    data.id, 
                    data.nombre, 
                    data.email, 
                    data.fotoPerfil, 
                    data.telefono, 
                    data.calle,
                    data.numExterior,
                    data.numInterior,
                    data.colonia,
                    data.rol
                );
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