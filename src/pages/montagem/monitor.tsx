import React from 'react';
import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import { GetStaticProps } from 'next';
import { api } from '../../services/api';
import Head from 'next/head';
import { checkHasProductInStock } from '../../utils/checkHasProductInStock';

export default function Monitor({ monitor }) {
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
          {monitor && monitor[0] ? (
            <ComponentsTable
              products={monitor}
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get('', {
    params: {
      pesquisa: 'MONITOR',
      situacao: 'A'
    },
  })

  const monitor = data.retorno.produtos.map(el => {
    const produto = el.produto;

    // if (!produto.nome.includes(' - ')) return null
    if (produto.nome.includes('GABINETE')) return null

    const hasInStock = checkHasProductInStock(produto.nome, produto.codigo)
    
    if(!hasInStock) return null

    return {
      name: produto.nome,
      price: produto.preco,
    }
  })

  return {
    props: {
      monitor: monitor.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}