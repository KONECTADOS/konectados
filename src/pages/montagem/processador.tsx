import React, { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import { api } from '../../services/api';
import { GetStaticProps } from 'next';
import { getSocketCompatibility } from '../../utils/getSocketCompatibility';
import { useComputer } from '../../hooks/useComputer';
import Head from 'next/head';
import estoque from '../../../estoque.json';
import { checkHasProductInStock } from '../../utils/checkHasProductInStock';

export default function Processador({ cpus }) {
  const { setup } = useComputer();
  const [cpuList, setCpuList] = useState([...cpus])

  return (
    <>
      <Head>
        <title>Processador | Konectados</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>Processador</h2>
            <p>Escolha um processador para continuar.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {cpuList && cpuList[0] ? (
            <ComponentsTable
              products={cpuList}
              componentName={'cpu'}
              onChoose={{ redirectTo: '/montagem/placamae' }}
            />
          ) : (
            <h3>Ops! Estamos realizando uma manutenção, logo a montagem estará disponível.</h3>
          )}
        </section>

      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get('', {
    params: {
      pesquisa: 'Processador',
      // situacao: 'A'
    },
  })

  const cpus = data.retorno.produtos.map(el => {
    const produto = el.produto;

    // if (!produto.nome.includes(' - ')) return null
    const coolerRegExp = new RegExp(/COOLER/);
    if (produto.nome.search(coolerRegExp) !== -1) return null

    const sockets = getSocketCompatibility(produto.nome)
    const hasInStock = checkHasProductInStock(produto.nome, produto.codigo)
    
    if(!hasInStock) return null

    return {
      name: produto.nome,
      price: produto.preco,
      cpuSocket: sockets[0] || null,
    }
  })

  return {
    props: {
      cpus: cpus.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}

