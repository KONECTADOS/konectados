import React, { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import Head from 'next/head';
import { fetchStock } from '../../services/fetchStock';

export default function Gabinete() {
  const [pcCabinetList, setPcCabinetList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))

    const promise = async () => {
      setIsLoading(true)
      await fetchStock("pcCabinets", setPcCabinetList);
    }

    if (!estoqueEmCache) {
      promise().then(() => setIsLoading(false))
    } else {
      setPcCabinetList(estoqueEmCache.pcCabinets)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Gabinete | Konectados</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>Gabinete</h2>
            <p>Escolha um gabinete para continuar.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {!isLoading && pcCabinetList[0] ? (
            <ComponentsTable
              products={pcCabinetList}
              componentName={'pcCabinet'}
              onChoose={{ redirectTo: '/montagem/fan' }}
            />
          ) : (
            <div className="loading"></div>
          )}
        </section>

        {/* <SkipComponentButton nextComponent='monitor'/> */}
      </main>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const { data } = await api.get('', {
//     params: {
//       pesquisa: 'GABINETE',
//       situacao: 'A'
//     },
//   })

//   const pcCabinet = data.retorno.produtos.map(el => {
//     const produto = el.produto;

//     // if (!produto.nome.includes(' - ')) return null
//     if (produto.nome.includes('C/FONTE')) return null
//     if (produto.nome.includes('SUPORTE PARA GABINETE')) return null
//     if (produto.nome.includes('COOLER PARA')) return null
//     if (produto.nome.includes('COOLER FAN PARA')) return null

//     const hasInStock = checkHasProductInStock(produto.nome, produto.codigo)

//     if(!hasInStock) return null

//     return {
//       name: produto.nome,
//       price: produto.preco,
//     }
//   })

//   return {
//     props: {
//       pcCabinet: pcCabinet.filter(el => el !== null),
//     },
//     revalidate: 1000 * 60 * 10 // 10 minutos 
//   }
// }
