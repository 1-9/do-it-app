import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'login-page',
  template: `
    <h1>Авторизация</h1>
    <form class="auth-from" (ngSubmit)="onSubmit(uname.value, upass.value)">
      <input type="text" name="username" #uname>
      <input type="password" name="password" #upass>
      <input type="submit">
    </form>
  `
})
export class LoginPageComponent {

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(uname, password) {
    this.userService.login(uname, password).subscribe(
      (result) => {
        if(result) {
          this.router.navigate(['']);
        }
      }
    );
  }
}
