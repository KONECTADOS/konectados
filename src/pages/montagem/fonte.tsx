import React from 'react';
// import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
// import fonte from '../../../fonte.json';
import { ComponentsTable } from '../../components/ComponentsTable';
// import { SkipComponentButton } from '../../components/SkipComponentButton';
import { GetStaticProps } from 'next';
import { api } from '../../services/api';
import { getPowerInWatts } from '../../utils/getPowerInWatts';
import Head from 'next/head';
import { checkHasProductInStock } from '../../utils/checkHasProductInStock';

export default function PowerSupply({ powerSupply }) {
  return (
    <>
    <Head>
        <title>Fonte | Konectados</title>
      </Head>
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>Fonte</h2>
          <p>Escolha uma fonte para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section className={styles.productTableSection}>
        { powerSupply && powerSupply[0] ? (
          <ComponentsTable 
            products={powerSupply}
            componentName={'powerSupply'}
            onChoose={{redirectTo: '/montagem/gabinete'}}
          />
        ) : (
          <h3>Ops! Estamos realizando uma manutenção, logo a montagem estará disponível.</h3>
        )}
      </section>

      {/* <SkipComponentButton nextComponent='gabinete'/> */}
    </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await api.get('', {
    params: {
      pesquisa: 'FONTE ATX',
      situacao: 'A'
    },
  })

  const powerSupply = data.retorno.produtos.map(el => {
    const produto = el.produto;

    // if (!produto.nome.includes(' - ')) return null
    if(produto.nome.includes('GABINETE')) return null
    const hasInStock = checkHasProductInStock(produto.nome, produto.codigo)
    
    if(!hasInStock) return null

    return { 
      name: produto.nome,
      price: produto.preco,
      powerInWatts: getPowerInWatts(produto.nome),
    }
  })

  return{
    props:{
      powerSupply: powerSupply.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}
