import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {
  INITIAL_MAX_POKEMON_ID,
  LAZY_LOADED_POKEMON_IDS,
} from "@/constants/pokemon";
import { getPokemon, PokemonResponse } from "@/services/api/pokemon";
import { Layout } from "@/components/Layout";
import { Pokemon, PokemonLazy } from "@/components/Pokemon";

export async function getStaticProps() {
  const pokemons = await Promise.all(
    Array.from({ length: INITIAL_MAX_POKEMON_ID }, (_, index) =>
      getPokemon(index + 1)
    )
  );
  return {
    props: {
      pokemons,
    },
  };
}

export default function Home({ pokemons }: { pokemons: PokemonResponse[] }) {
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
            {LAZY_LOADED_POKEMON_IDS.map((pokemonId) => (
              <PokemonLazy key={pokemonId} pokemonId={pokemonId} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
