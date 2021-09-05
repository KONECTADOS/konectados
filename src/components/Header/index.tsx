import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export function Header () {
  return (
    <header className={styles.header}>
      <Image src="/logo.svg" alt="Gamerzone" width="265px" height="54px" />

      <Link href="/montagem">
        <a className={styles.headerButton}>Monte seu PC</a>
      </Link>
    </header>
  );
}