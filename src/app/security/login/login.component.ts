import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
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

  get loginFormControls() {
    return this.loginForm.controls;
  }

  submit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService
        .login(
          this.loginFormControls.correo.value,
          this.loginFormControls.contrasenia.value
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
