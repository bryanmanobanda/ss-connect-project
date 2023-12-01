import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPersonComponent } from './card-person/card-person.component';
import {MatCardModule} from '@angular/material/card';
import { TabPersonComponent } from './tab-person/tab-person.component';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AboutPersonComponent } from './about-person/about-person.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { authControlGuard } from '../guards/auth-control.guard';

@NgModule({
  declarations: [
    CardPersonComponent,
    TabPersonComponent,
    PersonListComponent,
    AboutPersonComponent,
    ProfileUserComponent,
  ],
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatTabsModule, MatIconModule, MatProgressBarModule, RouterModule.forChild([
      {path: 'person-list', component:PersonListComponent}, {path: 'profile', component:ProfileUserComponent}
    ]),
  ]
})
export class PersonModule { }
