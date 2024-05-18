export class Pokemon {
  id: number
  hp: number
  cp: number
  name: string
  picture: string
  types: Array<string>
  created: Date

  constructor(
    name: string = '',
    picture: string = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/#.png',
    types: string[] = ['Normal'],
    created: Date = new Date(),
  ) {
    ;(this.name = name),
      (this.picture = picture),
      (this.types = types),
      (this.created = created)
  }
}
