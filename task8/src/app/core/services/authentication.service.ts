import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { API } from 'src/app/configs/api';

import { IUser, IGoogleUser } from 'src/app/core/models';

@Injectable()
export class AuthenticationService {
  private user$ = new BehaviorSubject<IUser>(null);

  constructor(
    private http: HttpClient
  ) { }

  public get getUserSubject(): BehaviorSubject<IUser> {
    return this.user$;
  }

  public loginRequest() {
    return this.http.get<IGoogleUser>(API.LOGIN_GOOGLE)
      .pipe(
        map(resp => {
          console.log(resp);
          this.user$.next({
            id: resp.id,
            name: resp.name.givenName,
            surname: resp.name.familyName,
          })
        }),
      );
  }
}
