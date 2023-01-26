import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { MAX_POKEMON_ID } from "@/constants/pokemon";
import { getPokemon, PokemonResponse } from "@/services/api/pokemon";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { Pokemon } from "@/components/Pokemon";

const inter = Inter({ subsets: ["latin"] });
type PokemonId = number;

export default function Home() {
  const [pokemons, setPokemons] = useState<Map<PokemonId, PokemonResponse>>(
    new Map()
  );
  useEffect(() => {
    const fetchPokemons = async () => {
      for (let pokemonId = 1; pokemonId <= MAX_POKEMON_ID; pokemonId++) {
        const pokemon = await getPokemon(pokemonId);
        setPokemons((pokemons) => new Map(pokemons).set(pokemonId, pokemon));
      }
    };
    fetchPokemons();
    return () => {
      setPokemons(new Map());
    };
  }, []);

  return (
    <>
      <Head>
        <title>The pokedex</title>
        <meta name="description" content="A nice pokedex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.main}>
          <div className={styles.pokemonListing}>
            {[...pokemons.values()].map((pokemon) => (
              <Pokemon key={pokemon.key} pokemon={pokemon} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
