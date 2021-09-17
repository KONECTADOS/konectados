import React from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import { api } from '../../services/api';
import { GetStaticProps } from 'next';
import { getSizeInGb } from '../../utils/getSizeInGb';
import Head from 'next/head';

export default function MemoriaRam({ ssd }) {
  return (
    <>
      <Head>
        <title>Memória RAM | Konectados</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>SSD</h2>
            <p>Escolha um ou mais SSDs ou pule esta etapa.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {ssd && ssd[0] ? (
            <ComponentsTable
              products={ssd}
              componentName={'SSD'}
              moreThanOne={true}
              onChoose={{ redirectTo: '/montagem/fonte' }}
            />
          ) : (
            <h3>Ops! Estamos realizando uma manutenção, logo a montagem estará disponível.</h3>
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
