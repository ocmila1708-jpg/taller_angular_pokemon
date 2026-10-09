import { Injectable, computed, signal } from '@angular/core';
import { PokemonTarjeta, Usuario } from './models';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  // ---------- Estado de entrenadores ----------
  private readonly _entrenadores = signal<Usuario[]>([]);
  private readonly _entrenadorActivoId = signal<number | null>(null);

  // ---------- Mochilas, una por entrenador (id -> pokemones) ----------
  private readonly _mochilas = signal<Record<number, PokemonTarjeta[]>>({});

  readonly entrenadores = this._entrenadores.asReadonly();

  readonly entrenadorActivo = computed(() =>
    this._entrenadores().find(u => u.id === this._entrenadorActivoId()) ?? null
  );

  readonly mochilaActual = computed(() => {
    const activo = this.entrenadorActivo();
    if (!activo) return [];
    return this._mochilas()[activo.id] ?? [];
  });

  // ---------- Entrenadores ----------

  registrarEntrenador(usuario: Usuario): void {
    this._entrenadores.update(lista => [...lista, usuario]);
    this._mochilas.update(m => ({ ...m, [usuario.id]: [] }));
    this._entrenadorActivoId.set(usuario.id);
  }

  seleccionarEntrenador(usuario: Usuario): void {
    this._entrenadorActivoId.set(usuario.id);
  }

  // ---------- Conexión con la PokeAPI ----------

  async buscarPokemon(nombre: string): Promise<PokemonTarjeta> {
    const query = nombre.trim().toLowerCase();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

    if (!res.ok) {
      throw new Error('Auxilio, Socorro, no hay Pokemon');
    }

    const datos = await res.json();

    return {
      id: datos.id,
      name: datos.name.toUpperCase(),
      image: datos.sprites.front_default,
      type: datos.types[0].type.name,
      baseExperience: datos.base_experience,
      esFavorito: false
    };
  }

  // ---------- Mochila del entrenador activo ----------

  guardarPokemonMochila(pokemon: PokemonTarjeta): void {
    const activo = this.entrenadorActivo();
    if (!activo) return;

    this._mochilas.update(m => ({
      ...m,
      [activo.id]: [...(m[activo.id] ?? []), pokemon]
    }));
  }

  eliminarPokemon(id: number): void {
    const activo = this.entrenadorActivo();
    if (!activo) return;

    this._mochilas.update(m => ({
      ...m,
      [activo.id]: (m[activo.id] ?? []).filter(p => p.id !== id)
    }));
  }

  actualizarFavorito(id: number): void {
    const activo = this.entrenadorActivo();
    if (!activo) return;

    this._mochilas.update(m => ({
      ...m,
      [activo.id]: (m[activo.id] ?? []).map(p =>
        p.id === id ? { ...p, esFavorito: !p.esFavorito } : p
      )
    }));
  }
}
