import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { take, Subject, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-card-person',
  templateUrl: './card-person.component.html',
  styleUrls: ['./card-person.component.css'],
})
export class CardPersonComponent implements OnInit, OnDestroy {
  selectedCard: any = null;

  personList: any[] = [];

  persona: Subscription;

  person: any[] = [];

  constructor(
    private personService: PersonService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getPersonas();
  }

  ngOnDestroy(): void {
    this.persona.unsubscribe();
  }

  getPersonas() {
    this.persona = this.personService.getPersonas()
    .pipe(
      take(1)
    ).subscribe({
      next: (data) => {
        this.personList = [];
        data.forEach((element: any) => {
          if(element.payload.doc.id != this.authService.userData.uid){
            this.personList.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data(),
            });
          }
        });
      },
      complete: () =>{
        this.toggleSelection(this.personList[0].id)
      },      
    });
  }

  getStarsArray(valoracion: number): any[] {
    return new Array(valoracion);
  }

  toggleSelection(id: string) {
    if (this.personService.selectedCardId === id) {
      this.personService.selectedCardId = null;
      this.personService.selectedCardData = null;
    } else {
      this.personService.selectedCardId = id;
      this.personService.selectedCardData = this.personList.find(
        (person) => person.id === id
      );
    }
    this.selectedCard = this.personService.selectedCardId;
  }
}
