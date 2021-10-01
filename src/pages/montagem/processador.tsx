import React, { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import Head from 'next/head';
import { fetchStock } from '../../services/fetchStock';
import { ProductModal } from '../../components/ProductModal';

interface CPUS {
  description: string;
  price: number;
  skuCode: number;
  images: string[];
  stock: number;
  cpuSocket: string;
}

export default function Processador() {
  const [cpuList, setCpuList] = useState<CPUS[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [productModal, setProductModal] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    // const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))
    fetchStock('cpus', setCpuList).then(() => setIsLoading(false))
  }, [])

  function handleOpenModal(product){
    setProductModal(product)
    setIsModalOpen(true)
  }

  return (
    <>
      <Head>
        <title>Processador | Konectados</title>
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
            <h2>Processador</h2>
            <p>Escolha um processador para continuar.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {!isLoading && cpuList[0] ? (
            <ComponentsTable
              products={cpuList}
              handleOpenModal={handleOpenModal}
              componentName={'cpu'}
              onChoose={{ redirectTo: '/montagem/placamae' }}
            />
          ) : (
            <div className="loading"></div>
          )}
        </section>

      </main>
    </>
  )
}
