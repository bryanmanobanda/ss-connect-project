import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonModule } from './person/person.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PersonModule,
    MatButtonModule,
    HttpClientModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    MatIconModule, 
    MatToolbarModule,
    RouterModule.forRoot([
      {path: '', redirectTo:'person-list', pathMatch: 'full'}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
