import { Component } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-about-person',
  templateUrl: './about-person.component.html',
  styleUrls: ['./about-person.component.css']
})
export class AboutPersonComponent {
  constructor(private personService: PersonService){}
  get selectedCardData() {
    return this.personService.selectedCardData;
  }
}
