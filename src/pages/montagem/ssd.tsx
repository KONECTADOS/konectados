import React, { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import { api } from '../../services/api';
import { GetStaticProps } from 'next';
import { getSizeInGb } from '../../utils/getSizeInGb';
import Head from 'next/head';
import { checkHasProductInStock } from '../../utils/checkHasProductInStock';
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get('', {
    params: {
      pesquisa: 'SSD',
      situacao: 'A'
    },
  })

  const ssd = data.retorno.produtos.map(el => {
    const produto = el.produto;

    // if (!produto.nome.includes(' - ')) return null
    if (produto.nome.includes('PLACA')) return null
    const sizeInGb = getSizeInGb(produto.nome)
    if (sizeInGb === 0) return null

    const hasInStock = checkHasProductInStock(produto.nome, produto.codigo)

    if (!hasInStock) return null



    return {
      name: produto.nome,
      price: produto.preco,
      sizeInGb
    }
  })

  return {
    props: {
      ssd: ssd.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}