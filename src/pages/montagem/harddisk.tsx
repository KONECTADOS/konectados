import React, { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import Head from 'next/head';
import { fetchStock } from '../../services/fetchStock';

export default function HardDisk() {
  const [hddList, setHddList] = useState([]);

  useEffect(() => {
    const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))

    if(!estoqueEmCache){
      fetchStock('hardDisks', setHddList).then(() => console.log('Carregado!'))
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
          {hddList && hddList[0] ? (
            <ComponentsTable
              products={hddList}
              componentName={'hardDisk'}
              moreThanOne={true}
              onChoose={{ redirectTo: '/montagem/ssd' }}
            />
          ) : (
            <h3>Ops! Estamos realizando uma manutenção, logo a montagem estará disponível.</h3>
          )}
        </section>

        {/* <SkipComponentButton componentToSkip='hardDisk' nextComponent='ssd'/> */}
      </main>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const { data } = await api.get('', {
//     params: {
//       pesquisa: 'HD ',
//       situacao: 'A'
//     },
//   })

//   const hardDisk = data.retorno.produtos.map(el => {
//     const produto = el.produto;

//     // if (!produto.nome.includes(' - ')) return null
//     if (produto.nome.includes('PLACA')) return null
//     const sizeInGb = getSizeInGb(produto.nome)
//     if (sizeInGb === 0) return null

//     const hasInStock = checkHasProductInStock(produto.nome, produto.codigo)
    
//     if(!hasInStock) return null


//     return {
//       name: produto.nome,
//       price: produto.preco,
//       sizeInGb
//     }
//   })

//   return {
//     props: {
//       hardDisk: hardDisk.filter(el => el !== null),
//     },
//     revalidate: 1000 * 60 * 10 // 10 minutos 
//   }
// }
