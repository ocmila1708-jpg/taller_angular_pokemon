import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[appResaltarTipoPokemon]',
  standalone: true
})
export class ResaltarTipoPokemonDirective {

  private el = inject(ElementRef<HTMLElement>);

  // Tipo de Pokémon que determina el color de resaltado
  appResaltarTipoPokemon = input<string>('normal');

  private readonly colores: Record<string, string> = {
    normal: '#7a6a55',
    fire: '#b6491d',
    water: '#1f5f9c',
    electric: '#8a6d00',
    grass: '#2f7d32',
    ice: '#1f7a94',
    fighting: '#a3341a',
    poison: '#6a2fa0',
    ground: '#8a6a1f',
    flying: '#4a5cc4',
    psychic: '#c22a82',
    bug: '#5c7a1f',
    rock: '#7a6a3f',
    ghost: '#5c3a8a',
    dragon: '#5233a8',
    dark: '#4a3f36',
    steel: '#4a5560',
    fairy: '#b8285f'
  };

  constructor() {
    // Deja siempre una pista sutil del tipo, incluso sin pasar el mouse
    this.aplicarBorde('1px solid var(--border, #f3d9e4)');
  }

  @HostListener('mouseenter') onMouseEnter() {
    const color = this.colores[this.appResaltarTipoPokemon()] ?? this.colores['normal'];
    this.aplicarEfecto(`2px solid ${color}`, 'scale(1.02)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.aplicarEfecto('1px solid var(--border, #f3d9e4)', 'scale(1)');
  }

  private aplicarBorde(borde: string) {
    this.el.nativeElement.style.border = borde;
    this.el.nativeElement.style.borderRadius = this.el.nativeElement.style.borderRadius || '16px';
  }

  private aplicarEfecto(borde: string, transformacion: string) {
    this.el.nativeElement.style.border = borde;
    this.el.nativeElement.style.transform = transformacion;
    this.el.nativeElement.style.transition = 'all 0.2s ease-in-out';
  }
}
