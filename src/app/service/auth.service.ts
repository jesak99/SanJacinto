import { EventEmitter, Injectable } from "@angular/core";
import { 
    Auth, 
    getAuth, 
    authState, 
    updateProfile, 
    UserInfo, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    FacebookAuthProvider,
    deleteUser
} from "@angular/fire/auth";
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import { Usuario } from "../model/usuario.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    currentUser$ = authState(this.auth);

    constructor(private auth: Auth) { }

    register({ email, password }: any) {
        return from(createUserWithEmailAndPassword(this.auth, email, password));
    }

    login({ email, password }: any) {
        return from(signInWithEmailAndPassword(this.auth, email, password));
    }

    loginWithGoogle() {
        return signInWithPopup(this.auth, new GoogleAuthProvider());
    }

    loginWithFacebook() {
        const facebook = new FacebookAuthProvider();
        //facebook.addScope('email');
        //facebook.addScope('public_profile');
        return signInWithPopup(getAuth(), facebook);
    }

    logout() {
        return from(this.auth.signOut());
    }

    updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
        const user = this.auth.currentUser;
        return of(user).pipe(
          concatMap((user) => {
            if (!user) throw new Error('Not Authenticated');
    
            return updateProfile(user, profileData);
          })
        );
    }

    deleteUsuario(){
        const user = this.auth.currentUser;
        return deleteUser(user!);
    }
    
}