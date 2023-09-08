import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  userData: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userSubject$.subscribe((ret) => {
      this.userData = ret;
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
