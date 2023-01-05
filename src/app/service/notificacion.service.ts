import { EventEmitter, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Messaging, getToken, onMessage, getMessaging } from "@angular/fire/messaging";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class NotificacionService {
    message: any = null;

    constructor(private messaging: Messaging) { }

    requestPermission() {
        const messaging = getMessaging();
        getToken(this.messaging,
            { vapidKey: environment.firebase.vapidKey }).then(
                (currentToken) => {
                    if (currentToken) {
                        console.log("Hurraaa!!! we got the token.....");
                        console.log(currentToken);
                    } else {
                        console.log('No registration token available. Request permission to generate one.');
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                });
    }
    listen() {
        const messaging = getMessaging();
        onMessage(this.messaging, (payload) => {
            console.log('Message received. ', payload);
            this.message = payload;
        });
    }
    /*
        requestPermission() {
            console.log('Requesting permission...');
            Notification.requestPermission().then((permission) => {
              if (permission === 'granted') {
                console.log('Notification permission granted.');
              }
            })
        };
    
        requestPermission(){
            return new Promise(async (resolve, reject)=>{
                const permis = await Notification.requestPermission();
                if(permis==="granted"){
                    const tokenFirebase = getToken(this.messaging);
                    resolve(tokenFirebase);
                }else{
                    reject(new Error("No se generó token"))
                }
            })
        }*/

    private messagingObservable = new Observable(observe => {
        onMessage(this.messaging, payload => {
            observe.next(payload);
        })
    });

    receiveMessage() {
        return this.messagingObservable;
    }

    enviarNotificacion() {
        const topic = 'highScores';

        const message = {
            data: {
                score: '850',
                time: '2:45'
            },
            topic: topic
        };

        /* Send a message to devices subscribed to the provided topic.
        getMessaging().send(message)
            .then(response => {
                console.log('Successfully sent message:', response);
            })
            .catch(error => {
                console.log('Error sending message:', error);
            });*/
    }
}