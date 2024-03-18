import { Injectable } from '@angular/core'
import { Pokemon } from './pokemon'
import { Observable, catchError, of, tap } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) { }

  private log(response: Pokemon[] | Pokemon | undefined) {
    console.table(response)
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error)
    return of(errorValue)
  }

  public getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, [])),
    )
  }

  public getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined)),
    )
  }

  // In a different api is it possible that put() would return a Observable<pokemon | undefined>
  public updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }

    return this.http.put<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null)),
    )
  }

  public addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }

    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null)),
    )
  }

  public deletePokemon(pokemonId: number): Observable<Pokemon | null> {
    return this.http.delete<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null)),
    )
  }

  public searchPokemonList(term: string): Observable<Pokemon[] | []> {
    if (term.length <= 1) {
      return of([])
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, [])),
    )
  }

  public getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy',
    ]
  }
}
