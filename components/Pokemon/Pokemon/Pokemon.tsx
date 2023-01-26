import { PokemonResponse } from "@/services/api/pokemon";
import { getPokemonId } from "@/services/format/pokemon";
import Image from "next/image";
import Link from "next/link";
import styles from "./Pokemon.module.css";

export default function Pokemon({
  pokemon,
  priorityLoad = false,
}: {
  pokemon: PokemonResponse;
  priorityLoad?: boolean;
}) {
  return (
    <Link key={pokemon.key} href={`pokemon/${pokemon.id}`}>
      <div className={styles.card}>
        <div className={styles.image}>
          <Image
            src={pokemon.sprite}
            alt={pokemon.name}
            width={150}
            height={150}
            priority={priorityLoad}
          />
        </div>
        <p className={styles.pokemonId}>{getPokemonId(pokemon)}</p>
        <p className={styles.pokemonName}>{pokemon.name}</p>
      </div>
    </Link>
  );
}
