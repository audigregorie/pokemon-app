import { Component, OnInit } from '@angular/core'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  message: string =
    "Vous etes déconnecté.\n(nom d'utilisateur: Pikachu / mot de passe: Pikachu)"
  name: string
  password: string
  auth: AuthService

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.auth = this.authService
  }

  setMessage() {
    if (this.auth.isLoggedIn) {
      this.message = 'Vous etes connecté'
    } else {
      this.message = 'Identifiant ou mot de passe incorrect.'
    }
  }

  login() {
    this.message = 'Tentation de connexion en cours'
    this.auth
      .login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage()
        if (isLoggedIn) {
          this.router.navigate(['/pokemons'])
        } else {
          this.password = ''
          this.router.navigate(['/login'])
        }
      })
  }

  logout() {
    this.auth.logout()
    this.message = 'Vous etes déconnecté'
  }
}
