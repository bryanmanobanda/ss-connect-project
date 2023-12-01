import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnDestroy{
  constructor(private personService: PersonService, private chatService: ChatService, public router: Router) { }
  ngOnDestroy(): void {
    
  }

  get selectedCardData() {
    return this.personService.selectedCardData;
  }

  getStarsArray(valoracion: number): any[] {
    return new Array(valoracion);
  }
  
  createChat() : void{
    this.chatService.createChat(this.selectedCardData).subscribe();
    this.router.navigate(['chat-list']);
  }
}