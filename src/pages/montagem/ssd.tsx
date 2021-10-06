import React, { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import Head from 'next/head';
import { fetchStock } from '../../services/fetchStock';
import { ProductModal } from '../../components/ProductModal';

export default function MemoriaRam() {
  const [ssdList, setSsdList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
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
      await fetchStock("SSDs", setSsdList);
    }

    if (!estoqueEmCache) {
      promise().then(() => setIsLoading(false))
    } else {
      setSsdList(estoqueEmCache.SSDs)
      setIsLoading(false)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Memória RAM | Konectados</title>
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
            <h2>SSD</h2>
            <p>Escolha um ou mais SSDs ou pule esta etapa.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {!isLoading && ssdList[0] ? (
            <ComponentsTable
              products={ssdList}
              componentName={'SSD'}
              handleOpenModal={handleOpenModal}
              moreThanOne={true}
              onChoose={{ redirectTo: '/montagem/fonte' }}
            />
          ) : (
            <div className="loading">
            </div>
          )}
        </section>

        {/* <SkipComponentButton componentToSkip='SSD' nextComponent='fonte'/> */}
      </main>
    </>
  )
}

