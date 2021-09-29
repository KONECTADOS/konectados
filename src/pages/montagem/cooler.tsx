import { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import Head from 'next/head';
import { fetchStock } from '../../services/fetchStock';

export default function Cooler({ coolers }) {
  const [coolerList, setCoolerList] = useState([])

  useEffect(() => {
    const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))

    if(!estoqueEmCache){
      fetchStock('coolers', setCoolerList).then(() => console.log('Carregado!'))
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
          {coolerList && coolerList[0] ? (
            <ComponentsTable
              products={coolerList}
              componentName={'waterCooler'}
              onChoose={{ redirectTo: '/montagem/memoriaram' }}
            />
          ) : (
            <h3>Ops! Estamos realizando uma manutenção, logo a montagem estará disponível.</h3>
          )}
        </section>

        <SkipComponentButton componentToSkip='waterCooler' nextComponent='memoriaram' />
      </main>
    </>
  )
}


// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const { data } = await api.get('', {
//     params: {
//       pesquisa: 'Cooler',
//       situacao: 'A'
//     },
//   })

//   const coolers = data.retorno.produtos.map(el => {
//     const produto = el.produto;

//     const sockets = getSocketCompatibility(produto.nome)

//     if (produto.nome.includes('CABO')) return null
//     if (produto.nome.includes('GABINETE')) return null
//     if (!produto.nome.includes('PROCESSADOR') && !produto.nome.includes('WATER')) return null

//     const hasInStock = checkHasProductInStock(produto.nome, produto.codigo)
    
//     if(!hasInStock) return null

//     return {
//       name: produto.nome,
//       price: produto.preco,
//       socketCompatibility: sockets[0] ? sockets : ['Universal'],
//     }
//   })

//   return {
//     props: {
//       coolers: coolers.filter(el => el !== null),
//     },
//     revalidate: 1000 * 60 * 10 // 10 minutos 
//   }
// }
