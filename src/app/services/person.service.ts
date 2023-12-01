import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  
  selectedCardId: string | null = null; 

  selectedCardData: any = null;

  constructor(private firestore: AngularFirestore) { }

  getPersonas() : Observable<any>{
    return this.firestore.collection('user').snapshotChanges();
  }

  getUserByUid(uid: string): Observable<any> {
    return this.firestore.collection('user').doc(uid).valueChanges();
  }

  getChat(documentId: string) : Observable<any>{
    return this.firestore.collection('chat').doc(documentId).get();

  }
}
