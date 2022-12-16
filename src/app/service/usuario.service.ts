import { EventEmitter, Injectable } from "@angular/core";
import { Auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "@angular/fire/auth";
import { Firestore, collection, addDoc, setDoc, doc, getFirestore, getDoc, query, where, getDocs, updateDoc } from '@angular/fire/firestore';
//import { collection } from "firebase/firestore";
import { Usuario } from "../model/usuario.model";

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    usuarioInfo: EventEmitter<Usuario> = new EventEmitter();
    listaUsers: EventEmitter<Usuario[]> = new EventEmitter();
    usuario?: Usuario;
    listUsuarios?: Usuario[]=[];

    constructor(private auth: Auth, private firestore: Firestore) { }

    register({ email, password }: any) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    login({ email, password }: any) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    loginWithGoogle() {
        return signInWithPopup(this.auth, new GoogleAuthProvider());
    }

    loginWithFacebook() {
        const facebook = new FacebookAuthProvider();
        facebook.addScope('email');
        facebook.addScope('public_profile');
        return signInWithPopup(getAuth(), facebook);
    }

    logout() {
        return signOut(this.auth);
    }

    addUser(user: Usuario) {
        return setDoc(doc(this.firestore, 'usuarios', user.id), {
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

        //return getDoc(doc(this.firestore, 'usuarios', uid))
    }

    setUser(user: Usuario) {
        this.usuario = user;
        this.usuarioInfo.emit(this.usuario);
    }

    getInfoUser() {
        return this.usuario;
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

        //const q = query(collection(this.firestore, "usuarios")).withConverter(userConverter);
        return getDocs(collection(this.firestore, "usuarios").withConverter(userConverter));
        /*
        querySnapshot.forEach((doc) => {
            var userTem = new Usuario(doc.id,doc.data().nombre,doc.data().email,doc.data().fotoPerfil,doc.data().rol);
            this.listUsuarios?.push(userTem);
        });*/
    }
}