import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginService } from './login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.loginService
      .login(this.username, this.password)
      .subscribe((response) => {
        this.authService.login(response.token);
      });
  }
}
