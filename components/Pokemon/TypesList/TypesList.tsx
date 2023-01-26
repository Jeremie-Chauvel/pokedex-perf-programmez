import { PokemonTypes, TYPE_COLOR_MAP } from "@/constants/pokemon";
import styles from "./TypesList.module.css";

export default function TypesList({ types }: { types: PokemonTypes[] }) {
  return (
    <ul className={styles.types}>
      {types.map((type) => (
        <li
          key={type}
          className={styles.type}
          style={{
            backgroundColor: TYPE_COLOR_MAP[type].background,
            color: TYPE_COLOR_MAP[type].foreground,
          }}
        >
          {type}
        </li>
      ))}
    </ul>
  );
}
