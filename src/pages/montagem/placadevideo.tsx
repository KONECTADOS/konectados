import { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import Head from 'next/head';
import { useComputer } from '../../hooks/useComputer';
import { getHasIntegratedGraphics } from '../../utils/getHasIntegratedGraphics';
import { fetchStock } from '../../services/fetchStock';

export default function PlacaDeVideo() {
  const [isGraphicCardRequired, setIsGraphicCardRequired] = useState(false);
  const [graphicCardsList, setGraphicCardsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const { setup } = useComputer();

  useEffect(() => {
    const hasIntegratedGraphics = getHasIntegratedGraphics(setup.cpu?.name || '');
    setIsGraphicCardRequired(!hasIntegratedGraphics);

    const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))

    const promise = async () => {
      setIsLoading(true)
      await fetchStock("SSDs", setGraphicCardsList);
    }

    if (!estoqueEmCache) {
      promise().then(() => setIsLoading(false))
    } else {
      setGraphicCardsList(estoqueEmCache.graphicCards)
    }

  }, [setup.cpu?.name])

  return (
    <>
      <Head>
        <title>Placa de vídeo | Konectados</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>Placa de Vídeo</h2>
            {isGraphicCardRequired
              ? <p>Escolha uma placa de vídeo para continuar.</p>
              : <p>Escolha uma placa de vídeo ou pule esta etapa.</p>
            }
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {!isLoading && graphicCardsList[0] ? (
            <ComponentsTable
              products={graphicCardsList}
              componentName={'graphicCard'}
              onChoose={{ redirectTo: '/montagem/harddisk' }}
            />
          ) : (
            <div className="loading"></div>
          )}
        </section>

        {!isGraphicCardRequired && <SkipComponentButton componentToSkip='graphicCard' nextComponent='harddisk' />}
      </main>
    </>
  )
}
