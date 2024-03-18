import { Component, OnInit } from '@angular/core'
import { Pokemon } from '../pokemon'
import { Router } from '@angular/router'
import { PokemonService } from '../pokemon.service'

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
  ) {}

  ngOnInit() {
    this.pokemonService
      .getPokemonList()
      .subscribe((pokemonList) => (this.pokemonList = pokemonList))
  }

  public goToPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id])
  }
}
