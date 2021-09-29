import { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import Head from 'next/head';
import { fetchStock } from '../../services/fetchStock';

export default function Monitor() {
  const [monitorList, setMonitorList] = useState([])

  useEffect(() => {
    const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))

    if(!estoqueEmCache){
      fetchStock('monitors', setMonitorList).then(() => console.log('Carregado!'))
    } else {
      setMonitorList(estoqueEmCache.monitors)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Monitor | Konectados</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>Monitor</h2>
            <p>Escolha um monitor ou pule esta etapa.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {monitorList && monitorList[0] ? (
            <ComponentsTable
              products={monitorList}
              componentName={'monitor'}
              onChoose={{ redirectTo: '/montagem/resultado' }}
            />
          ) : (
            <h3>Ops! Estamos realizando uma manutenção, logo a montagem estará disponível.</h3>
          )}
        </section>

        <SkipComponentButton componentToSkip='monitor' nextComponent='resultado' />
      </main>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const { data } = await api.get('', {
//     params: {
//       pesquisa: 'MONITOR',
//       situacao: 'A'
//     },
//   })

//   const monitor = data.retorno.produtos.map(el => {
//     const produto = el.produto;

//     // if (!produto.nome.includes(' - ')) return null
//     if (produto.nome.includes('GABINETE')) return null

//     const hasInStock = checkHasProductInStock(produto.nome, produto.codigo)
    
//     if(!hasInStock) return null

//     return {
//       name: produto.nome,
//       price: produto.preco,
//     }
//   })

//   return {
//     props: {
//       monitor: monitor.filter(el => el !== null),
//     },
//     revalidate: 1000 * 60 * 10 // 10 minutos 
//   }
// }