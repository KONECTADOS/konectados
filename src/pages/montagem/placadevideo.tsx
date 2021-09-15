import React from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
// import video from '../../../video.json';
import { ComponentsTable } from '../../components/ComponentsTable';
// import { SkipComponentButton } from '../../components/SkipComponentButton';
import { api } from '../../services/api';
import { GetStaticProps } from 'next';
import { getSizeInGb } from '../../utils/getSizeInGb';

export default function MemoriaRam({graphicCards}) {
  return (
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>Placa de Vídeo</h2>
          <p>Escolha um processador para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section className={styles.productTableSection}>
        <ComponentsTable 
          products={graphicCards}
          componentName={'graphicCard'}
          onChoose={{redirectTo: '/montagem/harddisk'}}
        />
      </section>

      {/* <SkipComponentButton nextComponent='memoriaram'/> */}
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await api.get('', {
    params: {
      pesquisa: 'Placa de video',
      situacao: 'A'
    },
  })

  const graphicCards = data.retorno.produtos.map(el => {
    const produto = el.produto;

    const regExp = new RegExp(/SUPORTE/);
    if(produto.nome.search(regExp) !== -1) return null

    // const sockets = getSocketCompatibility(produto.nome)

    return { 
      name: produto.nome,
      price: produto.preco,
      vRamSizeInGb: getSizeInGb(produto.nome)
    }
  })

  return{
    props:{
      graphicCards: graphicCards.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}