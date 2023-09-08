import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,BrowserAnimationsModule, MatProgressSpinnerModule, ReactiveFormsModule, ToastrModule.forRoot(), MatInputModule, MatFormFieldModule,MatIconModule,MatCardModule, RouterModule.forChild([{path:'login', component: LoginComponent}, {path:'register-user', component: RegisterComponent}])
  ]
})
export class SecurityModule { }
