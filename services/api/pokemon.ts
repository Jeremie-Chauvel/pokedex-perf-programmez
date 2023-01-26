import { MAX_POKEMON_ID, PokemonTypes } from "@/constants/pokemon";

const POKEAPI_POKEMON = "https://pokeapi.co/api/v2/pokemon";
const POKEAPI_SPECIE = "https://pokeapi.co/api/v2/pokemon-species";

type PokemonAPIResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: [
    {
      slot: number;
      type: {
        name: PokemonTypes;
        url: string;
      };
    }
  ];
};

export type PokemonResponse = {
  id: number;
  key: number;
  name: string;
  height: number;
  weight: number;
  sprite: string;
  types: PokemonTypes[];
};

function convertPokemonApiResponse(
  pokemon: PokemonAPIResponse
): PokemonResponse {
  return {
    id: pokemon.id,
    key: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    sprite: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id
      .toString()
      .padStart(3, "0")}.png`,
    types: pokemon.types.map((type) => type.type.name),
  };
}

type PokemonSpecieAPIResponse = {
  flavor_text_entries: Array<{
    flavor_text: string;
  }>;
};
export type PokemonSpecieResponse = {
  description: string;
};
function convertPokemonSpecieApiResponse(
  pokemon: PokemonSpecieAPIResponse
): PokemonSpecieResponse {
  return {
    description:
      pokemon.flavor_text_entries?.[0].flavor_text.replaceAll("", " ") ?? "",
  };
}

export function getPokemon(id: number): Promise<PokemonResponse> {
  return fetch(`${POKEAPI_POKEMON}/${id}`)
    .then((res) => res.json())
    .then(convertPokemonApiResponse);
}

export function getPokemonSpecie(id: number): Promise<PokemonSpecieResponse> {
  return fetch(`${POKEAPI_SPECIE}/${id}`)
    .then((res) => res.json())
    .then(convertPokemonSpecieApiResponse);
}

export async function getPokemons(): Promise<PokemonResponse[]> {
  const pokemons = [];
  try {
    for (let pokemonId = 1; pokemonId <= MAX_POKEMON_ID; pokemonId++) {
      pokemons.push(await getPokemon(pokemonId));
    }
  } catch (error) {
    console.error(error);
    return [];
  }
  return pokemons;
}

export function multiplicatePokemonListSize(
  pokemons: PokemonResponse[],
  scale: number
) {
  const newPokemons = [];
  for (let i = 0; i < scale; i++) {
    newPokemons.push(
      ...pokemons.map((pokemon) => ({
        ...pokemon,
        key: pokemon.id + i * pokemons.length,
      }))
    );
  }
  return newPokemons;
}
