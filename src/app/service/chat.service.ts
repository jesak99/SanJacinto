import { EventEmitter, Injectable } from "@angular/core";
import { Firestore, collection, collectionData, addDoc, setDoc, doc, getFirestore, getDoc, query, where, getDocs, Timestamp } from '@angular/fire/firestore';
import { Usuario } from "../model/usuario.model";
import { UsuarioService } from "./usuario.service";
import { concatMap, from, map, Observable, take, tap } from 'rxjs';
import { Chat, Message } from "../model/chat";
import { orderBy, updateDoc } from "firebase/firestore";

@Injectable({ providedIn: 'root' })
export class ChatService {

    constructor(private firestore: Firestore, private usuarioService: UsuarioService) { }

    createChat(otherUser: Usuario): Observable<string>{
        const ref = collection(this.firestore, 'chats');
        return this.usuarioService.currentUserProfile$.pipe(
            take(1),
            concatMap(user => addDoc(ref, {
                userIds: [user?.id, otherUser.id],
                users: [
                    {
                        nombre: user?.nombre ?? '',
                        fotoPerfil: user?.fotoPerfil ?? ''
                    },
                    {
                        nombre: otherUser.nombre ?? '',
                        fotoPerfil: otherUser.fotoPerfil ?? ''
                    }
                ]
            })),
            map(ref => ref.id)
        )
    }

    isExistingChat(otherUserId: string): Observable<string | null> {
        return this.$myChats.pipe(
          take(1),
          map((chats) => {
            for (let i = 0; i < chats.length; i++) {
              if (chats[i].userIds.includes(otherUserId)) {
                return chats[i].id;
              }
            }
    
            return null;
          })
        );
      }
    
    get $myChats(): Observable<Chat[]>{
        const ref = collection(this.firestore, 'chats');
        return this.usuarioService.currentUserProfile$.pipe(
            concatMap((user) => {
                const myQuery = query(ref, where('userIds', 'array-contains', user?.id));
                return collectionData(myQuery, {idField : 'id'}).pipe(
                    map(chats => this.addChatNameAndPic(user?.id ?? '', chats as Chat[]))
                ) as Observable<Chat[]>
            })
        )
    }

    addChatMessage(chatId: string, message: string): Observable<any>{
        const ref = collection(this.firestore, 'chats', chatId, 'messages');
        const chatRef = doc(this.firestore, 'chats', chatId);
        const today = Timestamp.fromDate(new Date());
        return this.usuarioService.currentUserProfile$.pipe(
            take(1),
            concatMap((user) => addDoc(ref, {
                text: message,
                senderId: user?.id,
                sendDate: today
            })),
            concatMap(() => updateDoc(chatRef, {lastMessage: message, lastMessageDate: today}))
        );
    }

    getChatMessages$(chatId: string): Observable<Message[]>{
        const ref = collection(this.firestore, 'chats', chatId, 'messages');
        const queryAll = query(ref, orderBy('sendDate', 'asc'));
        return collectionData(queryAll) as Observable<Message[]>;
    }

    addChatNameAndPic(currentUserId: string, chats: Chat[]): Chat[]{
        chats.forEach(chat => {
            const otherIndex = chat.userIds.indexOf(currentUserId) === 0 ? 1 : 0;
            const {nombre, fotoPerfil} = chat.users[otherIndex];
            chat.chatName = nombre ?? '';
            chat.chatPic = fotoPerfil ?? '';
        })

        return chats;
    }
}