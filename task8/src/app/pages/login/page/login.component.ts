import { Component } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  public onGoogleClick(): void {
    this.authenticationService.loginRequest().subscribe();
  }
}
