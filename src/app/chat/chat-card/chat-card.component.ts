import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css'],
})
export class ChatCardComponent {
  selectedChat: any = null;

  personListChat: any[] = [];

  person: any[] = [];

  ownerData: any;

  constructor(
    private auth: AuthService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.auth
      .currentUser()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.ownerData = data;
        },
        complete: () => {
          this.getChats();
        },
      });
  }

  get selectedCardData() {
    return this.chatService.selectedCardData;
  }

  ngOnDestroy(): void {}

  getChats() {
    this.chatService
      .myChats.pipe(take(1)).subscribe((data) => {
        this.personListChat = [];
        data.forEach((element: any) => {
          this.personListChat.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data(),
          });
        });
        if (this.personListChat.length > 0) {
          this.toggleSelection(this.personListChat[0].userIds[1]);
        }
      });
  }

  toggleSelection(id: string) {
    if (this.chatService.selectedChatId === id) {
      this.chatService.selectedChatId = null;
      this.chatService.selectedCardData = null;
    } else {
      this.chatService.selectedChatId = id;
      this.chatService.selectedCardData = this.personListChat.find(
        (chat) => chat.userIds[1] === id
      );
      this.chatService.getChatMessages().subscribe(
        data => this.chatService.myMessages = data
      )
    }

    this.selectedChat = this.chatService.selectedChatId;
  }
}
