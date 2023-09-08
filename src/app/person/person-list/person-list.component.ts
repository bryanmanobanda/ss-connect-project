import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnDestroy{
  constructor(private personService: PersonService) { }
  ngOnDestroy(): void {
    
  }

  get selectedCardData() {
    return this.personService.selectedCardData;
  }

  getStarsArray(valoracion: number): any[] {
    return new Array(valoracion);
  }
  
}