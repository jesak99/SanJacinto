import { Timestamp } from "firebase/firestore";
import { Usuario } from "./usuario.model";

export interface Chat {
    id: string;
    lastMessage?: string;
    lastMessageDate?: Date & Timestamp;
    userIds: string[];
    users: Usuario[];

    // Not stored, only for display
    chatPic?: string;
    chatName?: string;
}

export interface Message {
    text: string;
    senderId: string;
    sendDate: Date & Timestamp;
}