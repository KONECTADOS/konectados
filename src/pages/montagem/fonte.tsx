import { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import Head from 'next/head';
import { fetchStock } from '../../services/fetchStock';
import { ProductModal } from '../../components/ProductModal';

export default function PowerSupply() {
  const [powerSupplyList, setPowerSupplyList] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [productModal, setProductModal] = useState(null);

  function handleOpenModal(product) {
    setProductModal(product)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))

    const promise = async () => {
      setIsLoading(true)
      await fetchStock("powerSupplies", setPowerSupplyList);
    }


    if (!estoqueEmCache) {
      promise().then(() => setIsLoading(false))
    } else {
      setPowerSupplyList(estoqueEmCache.powerSupplies)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Fonte | Konectados</title>
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
            <h2>Fonte</h2>
            <p>Escolha uma fonte para continuar.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {!isLoading && powerSupplyList[0] ? (
            <ComponentsTable
              handleOpenModal={handleOpenModal}
              products={powerSupplyList}
              componentName={'powerSupply'}
              onChoose={{ redirectTo: '/montagem/gabinete' }}
            />
          ) : (
            <div className="loading"></div>
          )}
        </section>

        {/* <SkipComponentButton nextComponent='gabinete'/> */}
      </main>
    </>
  )
}
