import { Component } from '@angular/core';
import { Subject, take } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css']
})
export class ChatCardComponent {
  selectedCard:any = null; 

  personList:any[] = [];

  person:any[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private personService: PersonService){}

  ngOnInit(): void {
    this.getPersonas();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getPersonas() {
    this.personService.getPersonas().pipe(
      take(1)
    ).subscribe(data => {
      this.personList = [];
      data.forEach((element: any) => {
        this.personList.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      console.log(this.personList);
      if (this.personList.length > 0) {
        this.toggleSelection(this.personList[0].id);
      }
    });
  }

  toggleSelection(id: string) {
    if (this.personService.selectedCardId === id) {
      this.personService.selectedCardId = null;
      this.personService.selectedCardData = null;
    } else {
      this.personService.selectedCardId = id;
      this.personService.selectedCardData = this.personList.find(person => person.id === id);
    }
    this.selectedCard = this.personService.selectedCardId ;
  }
}
