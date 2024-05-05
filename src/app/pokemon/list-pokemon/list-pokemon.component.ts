import { Component, OnInit } from '@angular/core'
import { Pokemon } from '../pokemon'
import { Router } from '@angular/router'
import { PokemonService } from '../pokemon.service'
import { AuthService } from 'src/app/auth.service'

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss'],
})
export class ListPokemonComponent implements OnInit {
  public pokemonList: Pokemon[]

  constructor(
    private router: Router,
    private pokemonService: PokemonService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.pokemonService
      .getPokemonList()
      .subscribe((pokemonList) => (this.pokemonList = pokemonList))
  }

  public goToPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id])
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
