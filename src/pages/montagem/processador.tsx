import { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import Head from 'next/head';
import { fetchStock } from '../../services/fetchStock';

interface CPUS {
  description: string;
  price: number;
  skuCode: number;
  images: string[];
  stock: number;
  cpuSocket: string;
}

export default function Processador() {
  const [cpuList, setCpuList] = useState<CPUS[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    // const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))
    fetchStock('cpus', setCpuList).then(() => setIsLoading(false))
  }, [])

  return (
    <>
      <Head>
        <title>Processador | Konectados</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>Processador</h2>
            <p>Escolha um processador para continuar.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {!isLoading && cpuList[0] ? (
            <ComponentsTable
              products={cpuList}
              componentName={'cpu'}
              onChoose={{ redirectTo: '/montagem/placamae' }}
            />
          ) : (
            <div className="loading"></div>
          )}
        </section>

      </main>
    </>
  )
}
