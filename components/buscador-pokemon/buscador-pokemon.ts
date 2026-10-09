import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonTarjeta } from '../../services/models';
import { ResaltarTipoPokemonDirective } from '../../directives/resaltar-tipo-pokemon.directive';

@Component({
  selector: 'app-buscador-pokemon',
  standalone: true,
  imports: [FormsModule, ResaltarTipoPokemonDirective],
  templateUrl: './buscador-pokemon.html',
  styleUrl: './buscador-pokemon.css'
})
export class BuscadorPokemon {

  private pokemonService = inject(PokemonService);

  entrenadorActivo = this.pokemonService.entrenadorActivo;

  busqueda = '';
  pokemonActual = signal<PokemonTarjeta | null>(null);
  mensajeError = signal<string | null>(null);
  cargando = signal(false);

  async buscarPokemon(): Promise<void> {
    const query = this.busqueda.trim().toLowerCase();
    if (!query) return;

    this.cargando.set(true);
    this.mensajeError.set(null);

    try {
      const pokemon = await this.pokemonService.buscarPokemon(query);
      this.pokemonActual.set(pokemon);
    } catch (error: any) {
      this.pokemonActual.set(null);
      this.mensajeError.set(error.message);
    } finally {
      this.cargando.set(false);
    }
  }

  clickGuardar(): void {
    if (!this.entrenadorActivo()) {
      alert('Debes seleccionar o registrar un entrenador');
      return;
    }

    const pokemon = this.pokemonActual();
    if (pokemon) {
      this.pokemonService.guardarPokemonMochila(pokemon);
      alert(`El Pokemon ${pokemon.name} es guardado en la mochila de ${this.entrenadorActivo()?.nombreCompleto}`);
    }
  }
}
