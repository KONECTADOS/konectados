import React, { useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import { GetStaticProps } from 'next';
import { api } from '../../services/api';
import { getSocketCompatibility } from '../../utils/getSocketCompatibility';
import Head from 'next/head';
import { checkHasProductInStock } from '../../utils/checkHasProductInStock';

export default function Fans({ fans }) {
  // const [coolerList, setCoolerList] = useState([...fans])

  return (
    <>
      <Head>
        <title>Coolers | Konectados</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>FANs</h2>
            <p>Escolha um ou mais FANs ou pule esta etapa.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {fans && fans[0] ? (
            <ComponentsTable
              products={fans}
              componentName={'fan'}
              onChoose={{ redirectTo: '/montagem/monitor' }}
              moreThanOne
            />
          ) : (
            <h3>Ops! Estamos realizando uma manutenção, logo a montagem estará disponível.</h3>
          )}
        </section>

        {/* <SkipComponentButton componentToSkip='waterCooler' nextComponent='memoriaram' /> */}
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get('', {
    params: {
      pesquisa: 'Fan',
      situacao: 'A'
    },
  })

  const fans = data.retorno.produtos.map(el => {
    const produto = el.produto;

    const sockets = getSocketCompatibility(produto.nome)

    if (produto.nome.includes('SUPORTE')) return null
    if (produto.nome.includes('CABO')) return null
    if (produto.nome.includes('GABINETE GAMER')) return null
    if (produto.nome.includes('GABINETE 1 BAIA')) return null
    if (produto.nome.includes('MOUSE')) return null
    if (produto.nome.includes('CONTROLADORA')) return null

    const hasInStock = checkHasProductInStock(produto.nome, produto.codigo)
    
    if(!hasInStock) return null

    return {
      name: produto.nome,
      price: produto.preco,
      socketCompatibility: sockets[0] ? sockets : ['Universal'],
    }
  })

  return {
    props: {
      fans: fans.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}
