import React, { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
// import video from '../../../video.json';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import { api } from '../../services/api';
import { GetStaticProps } from 'next';
import { getSizeInGb } from '../../utils/getSizeInGb';
import Head from 'next/head';
import { useComputer } from '../../hooks/useComputer';
import { getHasIntegratedGraphics } from '../../utils/getHasIntegratedGraphics';

export default function PlacaDeVideo({ graphicCards }) {
  const [isGraphicCardRequired, setIsGraphicCardRequired] = useState(false);
  const {setup} = useComputer();
  useEffect(() => {
    const isRequired = getHasIntegratedGraphics(setup.cpu?.name);
    console.log(isRequired)
    setIsGraphicCardRequired(isRequired);
  }, [])

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
          <ComponentsTable
            products={graphicCards}
            componentName={'graphicCard'}
            onChoose={{ redirectTo: '/montagem/harddisk' }}
          />
        </section>

        {!isGraphicCardRequired && <SkipComponentButton componentToSkip='graphicCard' nextComponent='harddisk'/>}
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get('', {
    params: {
      pesquisa: 'Placa de video',
      situacao: 'A'
    },
  })

  const graphicCards = data.retorno.produtos.map(el => {
    const produto = el.produto;

    // if (!produto.nome.includes(' - ')) return null
    const regExp = new RegExp(/SUPORTE/);
    if (produto.nome.search(regExp) !== -1) return null

    // const sockets = getSocketCompatibility(produto.nome)

    return {
      name: produto.nome,
      price: produto.preco,
      vRamSizeInGb: getSizeInGb(produto.nome)
    }
  })

  return {
    props: {
      graphicCards: graphicCards.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}