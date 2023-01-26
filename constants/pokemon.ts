export const MAX_POKEMON_ID = 100;
export const INITIAL_MAX_POKEMON_ID = 20;

export const LAZY_LOADED_POKEMON_IDS = [
  ...Array(MAX_POKEMON_ID - INITIAL_MAX_POKEMON_ID),
].map((_, index) => index + 1 + INITIAL_MAX_POKEMON_ID);

export type PokemonTypes =
  | "grass"
  | "poison"
  | "fire"
  | "flying"
  | "water"
  | "bug"
  | "normal"
  | "electric"
  | "ground"
  | "fairy"
  | "fighting"
  | "psychic"
  | "rock"
  | "steel"
  | "ice"
  | "ghost"
  | "dragon"
  | "dark";
export const TYPE_COLOR_MAP: Record<
  PokemonTypes,
  { background: string; foreground: string }
> = {
  grass: { background: "#78C850", foreground: "#000000" },
  poison: { background: "#A040A0", foreground: "#FFFFFF" },
  fire: { background: "#F08030", foreground: "#000000" },
  flying: { background: "#A890F0", foreground: "#000000" },
  water: { background: "#6890F0", foreground: "#000000" },
  bug: { background: "#A8B820", foreground: "#000000" },
  normal: { background: "#A8A878", foreground: "#000000" },
  electric: { background: "#F8D030", foreground: "#000000" },
  ground: { background: "#E0C068", foreground: "#000000" },
  fairy: { background: "#EE99AC", foreground: "#000000" },
  fighting: { background: "#C03028", foreground: "#FFFFFF" },
  psychic: { background: "#F85888", foreground: "#000000" },
  rock: { background: "#B8A038", foreground: "#000000" },
  steel: { background: "#B8B8D0", foreground: "#000000" },
  ice: { background: "#98D8D8", foreground: "#000000" },
  ghost: { background: "#705898", foreground: "#FFFFFF" },
  dragon: { background: "#7038F8", foreground: "#FFFFFF" },
  dark: { background: "#705848", foreground: "#FFFFFF" },
};
