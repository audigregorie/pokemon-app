import { Component } from '@angular/core'
import { Pokemon } from '../pokemon'

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.scss'],
})
export class AddPokemonComponent {
  pokemon: Pokemon

  constructor() {
    this.pokemon = new Pokemon()
  }
}
