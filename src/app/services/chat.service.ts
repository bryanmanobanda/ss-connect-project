import { Injectable } from '@angular/core';
import { Observable, concatMap, from, map, take, timestamp } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  selectedChatId: string | null = null; 

  selectedCardData: any = null;

  chatId: any;

  myMessages: any[];

  constructor(private auth: AuthService, public firestore: AngularFirestore, public router: Router) { }

  createChat(otherUser: any): Observable<any> {
    const chatCollection = this.firestore.collection('chat');

    return from(
      chatCollection.add({}).then((docRef) => {
        const chatId = docRef.id;
        return this.auth.currentUser()
          .pipe(
            take(1),
            concatMap((user) =>
              chatCollection
                .doc(chatId)
                .set({
                  uidChat: chatId,
                  userIds: [user.uid, otherUser?.uid],
                  users: [
                    {
                      nombre: user?.nombre ?? '',
                      foto: user?.foto ?? '',
                    },
                    {
                      nombre: otherUser?.nombre ?? '',
                      foto: otherUser?.foto ?? '',
                    },
                  ],
                })
            )
          )
          .toPromise();
      })
    );
  }

  get myChats(): Observable<any>{
    return this.auth.currentUser().pipe(
      concatMap(user =>{
        return this.firestore.collection('chat', ref => ref.where('userIds', 'array-contains', user?.uid)).snapshotChanges();
      }) 
    );
  }

  addChatMessage(chatId:string, message:string, timestamp:any): Observable<any>{
    const chat =  this.firestore
    .collection('chat')
    .doc(chatId)
    .collection('messages');
    return this.auth.currentUser().pipe(
      take(1),
      concatMap(user => chat.add({
        text:message,
        senderId:user?.uid,
        sentDate: timestamp
      })),
      concatMap(() => this.firestore
        .collection('chat')
        .doc(chatId).update({
          lastMessage: message,
          lastMessageDate: timestamp
        }))
    );
  }
  
  getChatMessages(): Observable<any[]>{
    return this.firestore.collection('chat').doc(this.selectedCardData?.uidChat).collection('messages',  (ref) =>
    ref.orderBy('sentDate', 'asc')
  )
  .valueChanges();
  }
}
