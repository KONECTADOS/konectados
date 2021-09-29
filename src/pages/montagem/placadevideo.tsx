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
  const {setup} = useComputer();

  useEffect(() => {
    const hasIntegratedGraphics = getHasIntegratedGraphics(setup.cpu?.name || '');
    setIsGraphicCardRequired(!hasIntegratedGraphics);

    const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))

    if(!estoqueEmCache){
      fetchStock('graphicCards', setGraphicCardsList).then(() => console.log('Carregado!'))
    } else {
      console.log(estoqueEmCache.graphicCards)
      setGraphicCardsList(estoqueEmCache.graphicCards)
    }

  }, [setup.cpu.name])

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
            products={graphicCardsList}
            componentName={'graphicCard'}
            onChoose={{ redirectTo: '/montagem/harddisk' }}
          />
        </section>

        {!isGraphicCardRequired && <SkipComponentButton componentToSkip='graphicCard' nextComponent='harddisk'/>}
      </main>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const { data } = await api.get('', {
//     params: {
//       pesquisa: 'Placa de video',
//       situacao: 'A'
//     },
//   })

//   const graphicCards = data.retorno.produtos.map(el => {
//     const produto = el.produto;

//     const regExp = new RegExp(/SUPORTE/);
//     if (produto.nome.search(regExp) !== -1) return null

//     const hasInStock = checkHasProductInStock(produto.nome, produto.codigo)
    
//     if(!hasInStock) return null

//     return {
//       name: produto.nome,
//       price: produto.preco,
//       vRamSizeInGb: getSizeInGb(produto.nome)
//     }
//   })

//   return {
//     props: {
//       graphicCards: graphicCards.filter(el => el !== null),
//     },
//     revalidate: 1000 * 60 * 10 // 10 minutos 
//   }
// }