import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Details.module.css";
import { NextPageContext } from "next";
import Link from "next/link";
import { MAX_POKEMON_ID } from "@/constants/pokemon";
import {
  getPokemon,
  getPokemonSpecie,
  PokemonResponse,
  PokemonSpecieResponse,
} from "@/services/api/pokemon";
import { Layout } from "@/components/Layout";
import { TypesList, CallMyPokemon } from "@/components/Pokemon";
import { getPokemonId } from "@/services/format/pokemon";
import { useEffect, useState } from "react";
import { capitalize } from "lodash";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context: NextPageContext) {
  const pokemonId = context.query.pokemonId;
  if (!pokemonId || typeof pokemonId !== "string") return { notFound: true };
  const pokemonIdNumber = Number(pokemonId);
  if (isNaN(pokemonIdNumber)) return { notFound: true };

  return { props: { pokemonIdNumber } };
}

type PokemonDetails = {
  pokemon: PokemonResponse;
  prevPokemon: PokemonResponse;
  nextPokemon: PokemonResponse;
  pokemonSpecie: PokemonSpecieResponse;
};
async function getPokemonDetails(
  pokemonIdNumber: number
): Promise<PokemonDetails> {
  const pokemon = await getPokemon(pokemonIdNumber);
  const prevPokemon =
    pokemonIdNumber - 1 > 0
      ? await getPokemon(pokemonIdNumber - 1)
      : await getPokemon(MAX_POKEMON_ID);
  const nextPokemon =
    pokemonIdNumber + 1 < MAX_POKEMON_ID
      ? await getPokemon(pokemonIdNumber + 1)
      : await getPokemon(1);

  const pokemonSpecie = await getPokemonSpecie(pokemonIdNumber);
  return { pokemon, pokemonSpecie, prevPokemon, nextPokemon };
}

export default function PokemonDetails({
  pokemonIdNumber,
}: {
  pokemonIdNumber: number;
}) {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>();
  useEffect(() => {
    getPokemonDetails(pokemonIdNumber).then((pokemonDetails) =>
      setPokemonDetails(pokemonDetails)
    );
    return () => {
      setPokemonDetails(undefined);
    };
  }, [pokemonIdNumber]);

  if (!pokemonDetails) return null;

  const { pokemon, pokemonSpecie, prevPokemon, nextPokemon } = pokemonDetails;

  return (
    <>
      <Head>
        <title>{`${capitalize(pokemon.name)} Pokedex entry`}</title>
        <meta
          name="description"
          content={`Pokedex entry for the pokemon: ${pokemon.name}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.content}>
          <div className={styles.otherPokemons}>
            <Link href={`/pokemon/${prevPokemon.id}`}>
              <div className={styles.prevPokemon}>
                <span className={styles.otherPokemonId}>
                  {getPokemonId(prevPokemon)}
                </span>
                <span className={styles.otherPokemonName}>
                  {prevPokemon.name}
                </span>
              </div>
            </Link>

            <Link href={`/pokemon/${nextPokemon.id}`}>
              <div className={styles.nextPokemon}>
                <span className={styles.otherPokemonId}>
                  {getPokemonId(nextPokemon)}
                </span>
                <span className={styles.otherPokemonName}>
                  {nextPokemon.name}
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.pokemon}>
          <div className={styles.pokemonTitle}>
            <h1 className={styles.pokemonName}>{pokemon.name}</h1>
            <p className={styles.pokemonId}>{getPokemonId(pokemon)}</p>
          </div>
          <div className={styles.pokemonDetail}>
            <div key={pokemon.id} className={styles.card}>
              <div className={styles.image}>
                <Image
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  width={400}
                  height={400}
                />
              </div>
              <div className={styles.details}>
                <p className={styles.description}>
                  {pokemonSpecie.description}
                </p>
                <div className={styles.characteristics}>
                  <span>
                    <p className={styles.characteristicHeader}>Height</p>
                    <p className={styles.characteristicValue}>
                      {pokemon.height / 10}m
                    </p>
                  </span>
                  <span>
                    <p className={styles.characteristicHeader}>Weight</p>
                    <p className={styles.characteristicValue}>
                      {pokemon.weight / 10}kg
                    </p>
                  </span>
                </div>
                <div className={styles.typesContainer}>
                  <p>Type</p>
                  <TypesList types={pokemon.types} />
                </div>
              </div>
            </div>
          </div>
          <CallMyPokemon />
        </div>
      </Layout>
    </>
  );
}
