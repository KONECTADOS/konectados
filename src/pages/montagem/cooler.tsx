import { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import Head from 'next/head';
import { fetchStock } from '../../services/fetchStock';

export default function Cooler() {
  const [coolerList, setCoolerList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))

    const promise = async () => {
      setIsLoading(true)
      await fetchStock("coolers", setCoolerList);
    }

    if (!estoqueEmCache) {
      promise().then(() => setIsLoading(false))
    } else {
      setCoolerList(estoqueEmCache.coolers)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Coolers | Konectados</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>Cooler</h2>
            <p>Escolha um cooler para continuar.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {!isLoading && coolerList[0] ? (
            <ComponentsTable
              products={coolerList}
              componentName={'waterCooler'}
              onChoose={{ redirectTo: '/montagem/memoriaram' }}
            />
          ) : (
            <div className="loading"></div>
          )}
        </section>

        <SkipComponentButton componentToSkip='waterCooler' nextComponent='memoriaram' />
      </main>
    </>
  )
}
