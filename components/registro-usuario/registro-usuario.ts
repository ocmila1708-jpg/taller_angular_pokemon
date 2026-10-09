import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { Usuario } from '../../services/models';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro-usuario.html',
  styleUrl: './registro-usuario.css'
})
export class RegistroUsuario {

  private pokemonService = inject(PokemonService);

  entrenadores = this.pokemonService.entrenadores;
  entrenadorActivo = this.pokemonService.entrenadorActivo;

  formData = {
    nombre: '',
    apellido: '',
    tipoDoc: '',
    dni: '',
    fechaNacimiento: '',
    correo: '',
    pais: '',
    ciudad: '',
    aceptaPolitica: false
  };

  handleSubmit(): void {
    if (!this.formData.aceptaPolitica) {
      alert('Debes aceptar la política de tratamiento de datos.');
      return;
    }

    const nuevoUsuario: Usuario = {
      id: Date.now(),
      nombreCompleto: `${this.formData.nombre} ${this.formData.apellido}`.trim(),
      documento: {
        tipo: this.formData.tipoDoc,
        numero: this.formData.dni
      },
      fechaNacimiento: this.formData.fechaNacimiento,
      correo: this.formData.correo,
      pais: this.formData.pais,
      ciudad: this.formData.ciudad,
      datosPersonales: this.formData.aceptaPolitica,
      fechaRegistro: new Date().toLocaleDateString()
    };

    this.pokemonService.registrarEntrenador(nuevoUsuario);
    alert('Entrenador registrado correctamente.');

    this.formData = {
      nombre: '',
      apellido: '',
      tipoDoc: '',
      dni: '',
      fechaNacimiento: '',
      correo: '',
      pais: '',
      ciudad: '',
      aceptaPolitica: false
    };
  }

  seleccionarEntrenador(usuario: Usuario): void {
    this.pokemonService.seleccionarEntrenador(usuario);
  }
}
