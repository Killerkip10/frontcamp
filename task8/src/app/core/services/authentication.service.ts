import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { API } from 'src/app/configs/api';
import { IUser } from 'src/app/core/models';

import { HttpService } from './http.service';

@Injectable()
export class AuthenticationService {
  private user$ = new BehaviorSubject<IUser>(null);

  constructor(
    private httpService: HttpService,
  ) { }

  public get getUserSubject(): BehaviorSubject<IUser> {
    return this.user$;
  }

  public getUserInfo() {
    return this.httpService.get<IUser>(API.PROFILE)
      .pipe(
        map(resp => this.user$.next(resp)),
      );
  }
}
