import { Component, OnInit } from '@angular/core'
import { Pokemon } from '../pokemon'
import { PokemonService } from '../pokemon.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.scss'],
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    const pokemonId: string | null = this.activatedRoute.snapshot.paramMap.get('id')

    if (pokemonId) {
      this.pokemonService
        .getPokemonById(+pokemonId)
        .subscribe((pokemon) => (this.pokemon = pokemon))
    }
  }
}
