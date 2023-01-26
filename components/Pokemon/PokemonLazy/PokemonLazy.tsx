import { getPokemon, PokemonResponse } from "@/services/api/pokemon";
import { useEffect, useRef, useState } from "react";
import Pokemon from "../Pokemon/Pokemon";
import { useOnScreen } from "./useOnScreen";

export default function PokemonLazy({ pokemonId }: { pokemonId: number }) {
  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(ref, "300px");

  useEffect(() => {
    if (isOnScreen) {
      getPokemon(pokemonId).then((pokemon) => setPokemon(pokemon));
    }
  }, [isOnScreen, pokemonId]);

  return pokemon ? (
    <Pokemon pokemon={pokemon} />
  ) : (
    <div ref={ref} style={{ height: 282, width: 222 }} />
  );
}
