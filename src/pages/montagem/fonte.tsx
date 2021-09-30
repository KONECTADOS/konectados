import { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import Head from 'next/head';
import { fetchStock } from '../../services/fetchStock';

export default function PowerSupply() {
  const [powerSupplyList, setPowerSupplyList] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))

    const promise = async () => {
      setIsLoading(true)
      await fetchStock("powerSupplies", setPowerSupplyList);
    }


    if (!estoqueEmCache) {
      promise().then(() => setIsLoading(false))
    } else {
      setPowerSupplyList(estoqueEmCache.powerSupplies)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Fonte | Konectados</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>Fonte</h2>
            <p>Escolha uma fonte para continuar.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {!isLoading && powerSupplyList[0] ? (
            <ComponentsTable
              products={powerSupplyList}
              componentName={'powerSupply'}
              onChoose={{ redirectTo: '/montagem/gabinete' }}
            />
          ) : (
            <div className="loading"></div>
          )}
        </section>

        {/* <SkipComponentButton nextComponent='gabinete'/> */}
      </main>
    </>
  )
}
