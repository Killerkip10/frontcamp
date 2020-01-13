import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-other',
  templateUrl: './login-other.component.html',
})
export class LoginOtherComponent {
  @Output() clickGoogle = new EventEmitter<void>();

  public onGoogleClick(): void {
    this.clickGoogle.emit();
  }
}
