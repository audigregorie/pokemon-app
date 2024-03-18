import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Pokemon } from '../pokemon'
import { PokemonService } from '../pokemon.service'

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss'],
})
export class DetailPokemonComponent implements OnInit {
  public pokemonList: Pokemon[]
  public pokemon: Pokemon | undefined

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
  ) {}

  ngOnInit() {
    const pokemonId: string | null = this.activatedRoute.snapshot.paramMap.get('id')

    if (pokemonId) {
      this.pokemonService
        .getPokemonById(+pokemonId)
        .subscribe((pokemon) => (this.pokemon = pokemon))
    }
  }

  public deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemon(pokemon.id).subscribe(() => this.goToPokemons())
  }

  public goToPokemons() {
    this.router.navigate(['/pokemons'])
  }

  public goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.id])
  }
}
