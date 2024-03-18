import { Component, Input, OnInit } from '@angular/core'
import { Pokemon } from '../pokemon'
import { PokemonService } from '../pokemon.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss'],
})
export class PokemonFormComponent implements OnInit {
  public types: string[]
  public isAddForm: boolean
  @Input() public pokemon: Pokemon

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList()
    this.isAddForm = this.router.url.includes('add')
  }

  public hasType(type: string) {
    return this.pokemon.types.includes(type)
  }

  public selectType(event: Event, type: string) {
    const isChecked = (event.target as HTMLInputElement).checked
    const index = this.pokemon.types.indexOf(type)

    if (isChecked) {
      this.pokemon.types.push(type)
    } else {
      this.pokemon.types.splice(index, 1)
    }
  }

  public isTypesValid(type: string): boolean {
    if (this.pokemon.types.length === 1 && this.hasType(type)) {
      return false
    }

    if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false
    }

    return true
  }

  public onSubmit() {
    if (this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon).subscribe((pokemon: Pokemon) => {
        this.router.navigate(['/pokemon', pokemon.id])
      })
    } else {
      this.pokemonService.updatePokemon(this.pokemon).subscribe(() => {
        this.router.navigate(['/pokemon', this.pokemon.id])
      })
    }
  }
}
