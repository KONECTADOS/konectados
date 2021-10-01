import { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import Head from 'next/head';
import { fetchStock } from '../../services/fetchStock';
import { ProductModal } from '../../components/ProductModal';

export default function Monitor() {
  const [monitorList, setMonitorList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [productModal, setProductModal] = useState(null);

  function handleOpenModal(product){
    setProductModal(product)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))
    
    const promise = async () => {
      setIsLoading(true)
      await fetchStock("monitors", setMonitorList);
    }

    if(!estoqueEmCache){
      promise().then(() => setIsLoading(false))
    } else {
      setMonitorList(estoqueEmCache.monitors)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Monitor | Konectados</title>
      </Head>

      {productModal && (
        <ProductModal
          isOpen={modalIsOpen}
          product={productModal}
          changeStateFunction={() =>  setIsModalOpen(false)}
        />
      )}

      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>Monitor</h2>
            <p>Escolha um monitor ou pule esta etapa.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {!isLoading && monitorList[0] ? (
            <ComponentsTable
              products={monitorList}
              handleOpenModal={handleOpenModal}
              componentName={'monitor'}
              onChoose={{ redirectTo: '/montagem/resultado' }}
            />
          ) : (
            <div className="loading"></div>
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