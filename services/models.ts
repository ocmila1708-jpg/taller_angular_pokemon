export interface Usuario {
  id: number;
  nombreCompleto: string;
  documento: {
    tipo: string;
    numero: string;
  };
  fechaNacimiento: string;
  correo: string;
  pais?: string;
  ciudad?: string;
  datosPersonales: boolean;
  fechaRegistro: string;
}

export interface PokemonTarjeta {
  id: number;
  name: string;
  image: string;
  type: string;
  baseExperience: number;
  esFavorito: boolean;
}
