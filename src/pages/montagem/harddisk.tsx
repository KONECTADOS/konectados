import React, { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import Head from 'next/head';
import { fetchStock } from '../../services/fetchStock';

export default function HardDisk() {
  const [hddList, setHddList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))

    const promise = async () => {
      setIsLoading(true)
      await fetchStock("hardDisks", setHddList);
    }

    if (!estoqueEmCache) {
      promise().then(() => setIsLoading(false))
    } else {
      setHddList(estoqueEmCache.hardDisks)
    }
  }, [])


  return (
    <>
      <Head>
        <title>Hard Disk | Konectados</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>Hard Disk</h2>
            <p>Escolha um ou mais HDs ou pule esta etapa.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {!isLoading && hddList[0] ? (
            <ComponentsTable
              products={hddList}
              componentName={'hardDisk'}
              moreThanOne={true}
              onChoose={{ redirectTo: '/montagem/ssd' }}
            />
          ) : (
            <div className="loading"></div>
          )}
        </section>

        {/* <SkipComponentButton componentToSkip='hardDisk' nextComponent='ssd'/> */}
      </main>
    </>
  )
}
