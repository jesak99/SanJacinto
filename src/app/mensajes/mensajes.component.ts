import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from '../service/chat.service';
import { UsuarioService } from '../service/usuario.service';
import { combineLatest, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent {

  @ViewChild('endOfChat') endOfChat!: ElementRef;

  user$ = this.usuarioService.currentUserProfile$;
  searchControl = new FormControl('');
  chatListControl = new FormControl();
  messageControl = new FormControl('');

  //users$ = this.usuarioService.allUsers$;
  users$ = combineLatest([this.usuarioService.allUsers$, this.user$, this.searchControl.valueChanges.pipe(startWith(''))])
  .pipe(
    map(([users, user, searchString])=> users.filter(u => u.nombre?.toLowerCase().includes(searchString!.toLowerCase()) && u.id !== user?.id))
  );

  myChats$ = this.chatService.$myChats;

  selectedChat$ = combineLatest([
    this.chatListControl!.valueChanges,
    this.myChats$,
  ]).pipe(map(([value, chats]) => chats.find((c) => c.id === value[0])));

  messages$ = this.chatListControl.valueChanges.pipe(
    map(value => value[0]),
    switchMap(chatId => this.chatService.getChatMessages$(chatId)),
    tap(()=>{
      this.scrollToBottom();
    })
  )

  constructor(private chatService: ChatService, private usuarioService: UsuarioService) { }

  createChat(otherUser: Usuario){
    this.chatService.isExistingChat(otherUser.id).pipe(
      switchMap((chatId) => {
        if (!chatId) {
          return this.chatService.createChat(otherUser);
        } else {
          return of(chatId);
        }
      })
    ).subscribe((chatId) => {
      this.chatListControl.setValue([chatId]);
    });
  }

  sendMessage(){
    const message = this.messageControl.value;
    const selectedChatId = this.chatListControl.value[0];

    if(message && selectedChatId){
      this.chatService.addChatMessage(selectedChatId, message).subscribe(()=>{
        this.scrollToBottom();
      });
      this.messageControl.setValue('');
    }

  }

  scrollToBottom(){
    setTimeout(() => {
      if(this.endOfChat){
        this.endOfChat.nativeElement.scrollIntoView({behavior: 'smooth'})
      }
    }, 100);
  }

}
