import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  public ngOnInit(): void {
    this.authenticationService.getUserInfo().subscribe();
  }
}
