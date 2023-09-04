import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPersonComponent } from './card-person/card-person.component';
import {MatCardModule} from '@angular/material/card';
import { TabPersonComponent } from './tab-person/tab-person.component';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [
    CardPersonComponent,
    TabPersonComponent
  ],
  imports: [
    CommonModule, MatCardModule, MatTabsModule
  ],
  exports: [CardPersonComponent,TabPersonComponent]
})
export class PersonModule { }
