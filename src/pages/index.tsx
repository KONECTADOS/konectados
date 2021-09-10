/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from '../styles/index.module.scss';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.pageContent}>
        <h2>Monte seu pc com a <span>konectados</span></h2>
        <p>Crie o <span>setup gamer</span> que você sempre sonhou. Escolha seus componentes pela plataforma e envie para nossa equipe.</p>
        <Link href="/montagem" passHref>
          <button>Monte seu PC</button>
        </Link>
      </div>

      <div className={styles.image}>
        <img src="/background.webp" alt="Jovem jogando em seu computador gamer"/>
      </div>
    </main>
  )
}
