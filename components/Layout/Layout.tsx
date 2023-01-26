import Link from "next/link";
import styles from "./Layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <img
            src="/pokeball.png"
            alt="pokedex logo"
            width={100}
            height={100}
          />{" "}
          Pokedex
        </Link>
      </div>
      <div className={styles.heroImageContainer}>
        <img
          src="/pokemon-hero-image-alt.png"
          alt=""
          className={styles.heroBanner}
        />
      </div>
      <div className={styles.content}>{children}</div>
    </main>
  );
}
