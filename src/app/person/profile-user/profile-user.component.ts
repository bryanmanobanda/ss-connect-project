import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit{
  selectedCardData: any = null;
  profileU:Subscription;
  profileGet:Subscription;
  comEditar = false;
  loginForm: FormGroup;

  constructor(private auth: AuthService, private person: PersonService, private fb: FormBuilder,){

  }

  ngOnInit(): void {
    this.profileU = 
    this.auth.currentUser().subscribe((user) => {
      if (user) {
        this.profileGet= this.person.getUserByUid(user.uid).subscribe((data) => {
          this.selectedCardData = data;
        })
      }
    });

    this.loginForm = this.fb.group({
      habilidadesA: [{disabled:true}, Validators.compose([Validators.required, Validators.email])],
      a: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  
  ngOnDestroy(): void {
    this.selectedCardData = null;
    this.profileGet.unsubscribe();
    this.profileU.unsubscribe();
  }

  submit(){
    this.comEditar = true;

  }

  getStarsArray(valoracion: number): any[] {
    return new Array(valoracion);
  }
}

