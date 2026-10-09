import { Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ResaltarTipoPokemonDirective } from '../../directives/resaltar-tipo-pokemon.directive';

@Component({
  selector: 'app-inventario-pokemon',
  standalone: true,
  imports: [ResaltarTipoPokemonDirective],
  templateUrl: './inventario-pokemon.html',
  styleUrl: './inventario-pokemon.css'
})
export class InventarioPokemon {

  private pokemonService = inject(PokemonService);

  entrenadorActivo = this.pokemonService.entrenadorActivo;
  mochilaActual = this.pokemonService.mochilaActual;

  actualizarFavorito(id: number): void {
    this.pokemonService.actualizarFavorito(id);
  }

  eliminarPokemon(id: number): void {
    this.pokemonService.eliminarPokemon(id);
  }
}
