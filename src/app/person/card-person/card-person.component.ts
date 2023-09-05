import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-card-person',
  templateUrl: './card-person.component.html',
  styleUrls: ['./card-person.component.css']
})
export class CardPersonComponent implements OnInit, OnDestroy {
  
  selectedCard:any = null; 

  personList:any[] = [];

  constructor(private personService: PersonService){}

  ngOnInit(): void {
    this.getPersonas()
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  getPersonas(){
    this.personService.getPersonas().subscribe(data => {
      this.personList = []
      data.forEach((element:any) => {
        this.personList.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.personList)
    });
  }

  getStarsArray(valoracion: number): any[] {
    return new Array(valoracion);
  }

  toggleSelection(id: string) {
    if (this.personService.selectedCardId === id) {
      this.personService.selectedCardId = null;
    } else {
      this.personService.selectedCardId = id;
    }
    this.selectedCard = this.personService.selectedCardId ;
  }
}
