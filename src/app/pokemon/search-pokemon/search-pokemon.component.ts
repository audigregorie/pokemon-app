import { Component, OnInit } from '@angular/core'
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs'
import { Pokemon } from '../pokemon'
import { Router } from '@angular/router'
import { PokemonService } from '../pokemon.service'

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss'],
})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>()
  pokemons$: Observable<Pokemon[]>

  constructor(
    private router: Router,
    private pokemonService: PokemonService,
  ) { }

  ngOnInit() {
    this.pokemons$ = this.searchTerms.pipe(
      // Waits 3 miliseconds before sending what the user searches to the server.
      debounceTime(300),
      // Will not send duplicate requests to the server.
      distinctUntilChanged(),
      // Map would send an Observable of the term(Observable<term> but we want to send the last search that the user sends to the server. SwitchMap will send us not an Observable but directly the pokemonList based off the term.
      switchMap((term) => this.pokemonService.searchPokemonList(term)),
    )
  }

  search(term: string) {
    this.searchTerms.next(term)
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id]
    this.router.navigate(link)
  }
}
