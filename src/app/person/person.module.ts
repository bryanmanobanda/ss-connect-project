import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPersonComponent } from './card-person/card-person.component';
import {MatCardModule} from '@angular/material/card';
import { TabPersonComponent } from './tab-person/tab-person.component';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { InformationPersonComponent } from './information-person/information-person.component';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';




@NgModule({
  declarations: [
    CardPersonComponent,
    TabPersonComponent,
    PersonListComponent,
    InformationPersonComponent,
  ],
  imports: [
    CommonModule, MatCardModule, MatTabsModule, MatIconModule, MatProgressBarModule, RouterModule.forChild([
      {path: 'person-list', component:PersonListComponent}
    ]),
  ]
})
export class PersonModule { }
