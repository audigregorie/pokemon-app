import { NgModule, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component'
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component'
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component'
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component'
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component'
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component'
import { LoaderComponent } from './loader/loader.component'
import { LoginComponent } from '../login/login.component'

import { BorderCardDirective } from './border-card.directive'
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe'
import { PokemonService } from './pokemon.service'
import { authGuard } from '../auth.guard'

const pokemonRoutes: Routes = [
  {
    path: 'edit/pokemon/:id',
    component: EditPokemonComponent,
    canActivate: [authGuard],
  },
  {
    path: 'pokemon/add',
    component: AddPokemonComponent,
    canActivate: [() => inject(authGuard).canActivate()],
  },
  {
    path: 'pokemons',
    component: ListPokemonComponent,
    canActivate: [authGuard],
  },
  {
    path: 'pokemon/:id',
    component: DetailPokemonComponent,
    canActivate: [authGuard],
  },
]

@NgModule({
  declarations: [
    ListPokemonComponent,
    DetailPokemonComponent,
    BorderCardDirective,
    PokemonTypeColorPipe,
    PokemonFormComponent,
    EditPokemonComponent,
    AddPokemonComponent,
    SearchPokemonComponent,
    LoaderComponent,
    LoginComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(pokemonRoutes)],
  providers: [PokemonService],
})
export class PokemonModule {}
