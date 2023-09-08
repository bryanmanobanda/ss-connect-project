import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(/^[A-Za-z\s]+$/),
        ]),
      ],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      contrasenia: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/
          ),
        ]),
      ],
    });
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }

  submit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.authService
        .registerPerson(
          this.registerFormControls.correo.value,
          this.registerFormControls.contrasenia.value,
          this.registerFormControls.nombre.value
        )
        .then((result) => {
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
        });
    }
  }
}
