/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/finalizar.module.scss';

export default function Finalizar() {
  return (
    <>
      <Head>
        <title>Finalizar montagem | Konectados</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.pageContent}>
          <h5>✔️ Obrigado por montar seu PC com a gente!</h5>
          <h2>Logo entraremos em contato com você sobre como <span>finalizar sua compra</span>, até lá:</h2>

          <a href="https://www.konectados.com.br/" target="_blank" rel="noreferrer">
            Acesse nossa loja
          </a>
          <Link href="/">
            <a href="" className={styles.secondary}>
              Voltar para o inicio
            </a>
          </Link>
        </div>
      </main>
    </>
  )
}
