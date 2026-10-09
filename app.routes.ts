import { Routes } from '@angular/router';
import { RegistroUsuario } from './components/registro-usuario/registro-usuario';
import { BuscadorPokemon } from './components/buscador-pokemon/buscador-pokemon';
import { InventarioPokemon } from './components/inventario-pokemon/inventario-pokemon';

export const routes: Routes = [
  { path: '', redirectTo: 'registro', pathMatch: 'full' },
  { path: 'registro', component: RegistroUsuario },
  { path: 'buscador', component: BuscadorPokemon },
  { path: 'inventario', component: InventarioPokemon },
  { path: '**', redirectTo: 'registro' }
];
