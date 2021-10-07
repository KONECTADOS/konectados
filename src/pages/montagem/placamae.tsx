import React, { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import Head from 'next/head';
import { useComputer } from '../../hooks/useComputer';
import { getCPUGenCompatibility } from '../../utils/getCPUGenCompatibility';
import { fetchStock } from '../../services/fetchStock';
import { ProductModal } from '../../components/ProductModal';

export default function PlacaMae({ }) {
  const [motherboardList, setMotherboardList] = useState([])
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
      await fetchStock("motherboards", setMotherboardList);
    }

    if (!estoqueEmCache) {
      promise().then(() => setIsLoading(false))
    } else {
      setMotherboardList(estoqueEmCache.motherboards)
      setIsLoading(false)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Placa mãe | Konectados</title>
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
            <h2>Placa mãe</h2>
            <p>Escolha uma placa mãe para continuar.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {!isLoading && motherboardList[0] ? (
            <ComponentsTable
              products={motherboardList}
              handleOpenModal={handleOpenModal}
              componentName={'motherboard'}
              onChoose={{ redirectTo: '/montagem/cooler' }}
            />
          ) : (
            <div className="loading"></div>
          )}
        </section>

      </main>
    </>
  )
}
