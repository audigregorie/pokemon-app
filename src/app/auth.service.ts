import { Injectable } from '@angular/core'
import { delay, of, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false
  redirectUrl: string

  constructor() { }

  login(name: string, password: string) {
    const isLoggedIn = name === 'pikachu' && password === 'pikachu'

    return of(isLoggedIn).pipe(
      delay(1000),
      tap((isLoggedIn) => (this.isLoggedIn = isLoggedIn)),
    )
  }

  logout() {
    this.isLoggedIn = false
  }
}
