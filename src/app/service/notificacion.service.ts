import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Messaging, getToken, onMessage, getMessaging } from "@angular/fire/messaging";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AvisoComponent } from 'src/app/aviso/aviso.component';

@Injectable({ providedIn: 'root' })
export class NotificacionService {
    message: any = null;

    constructor(private messaging: Messaging, private snackBar: MatSnackBar) { }

    requestPermission() {
        const messaging = getMessaging();
        getToken(this.messaging,
            { vapidKey: environment.firebase.vapidKey }).then(
                (currentToken) => {
                    if (currentToken) {
                        this.snackBar.openFromComponent(AvisoComponent, {
                            duration: 3000,
                            data: {
                              texto: "A partir de ahora podrás recibir notificaciones",
                              clase: "toast-success",
                              icono: "check",
                            },
                        });
                    } else {
                        this.snackBar.openFromComponent(AvisoComponent, {
                            duration: 3000,
                            data: {
                              texto: "Ha ocurrido un error al activar las notificaciones :(",
                              clase: "toast-error",
                              icono: "error",
                            },
                          });
                        //console.log('No registration token available. Request permission to generate one.');
                    }
                }).catch((err) => {
                    this.snackBar.openFromComponent(AvisoComponent, {
                        duration: 3000,
                        data: {
                          texto: "Revise los permisos del navegador para recibir notificaciones :(",
                          clase: "toast-error",
                          icono: "error",
                        },
                      });
                    //console.log('An error occurred while retrieving token. ', err);
                });
    }
    listen() {
        const messaging = getMessaging();
        onMessage(this.messaging, (payload) => {
            console.log('Message received. ', payload);
            this.message = payload;
        });
    }

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
    }
}