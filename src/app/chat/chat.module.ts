import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatCardComponent } from './chat-card/chat-card.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { authControlGuard } from '../guards/auth-control.guard';

@NgModule({
  declarations: [ChatCardComponent, ChatListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'chat-list', component: ChatListComponent},
    ]),
  ],
})
export class ChatModule {}
