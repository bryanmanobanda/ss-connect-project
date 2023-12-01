import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, filter, of, switchMap, timestamp } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit, OnDestroy {
  chatListControl: FormGroup;
  message =  new FormControl();
  myChats = this.chatService.myChats;
  timestamp:any
  myMessages: any[]
  chatMessages:any;

  constructor(private chatService: ChatService, private fb: FormBuilder, private auth: AuthService){}
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.chatListControl = this.fb.group({
      message: new FormControl(''),
    });

  }

  get selectedCardData(){
    this.myMessages = 
    this.chatService.myMessages;
      return this.chatService.selectedCardData
  }

  sendMessage(){
    const message = this.message.value;
    const selectedChatId = this.chatService.selectedCardData.uidChat
    let list1 = of(1);  
    let final_val = list1.pipe(timestamp());  
    final_val.subscribe({
      next:x => this.timestamp=x.timestamp,
      complete: () => {
        if(message && selectedChatId){
          this.chatService.addChatMessage(selectedChatId, message, this.timestamp).subscribe();
          this.message.setValue('');
        }
      }
    })
  }

  get getCurrentUser(){
    return this.auth.userData
  }
}
