import React from 'react';
import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import { GetStaticProps } from 'next';
import { api } from '../../services/api';

export default function Monitor({ monitor }) {
  return (
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>Monitor</h2>
          <p>Escolha um processador para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section className={styles.productTableSection}>
        <ComponentsTable 
          products={monitor}
          componentName={'screen'}
          onChoose={{redirectTo: '/montagem/resultado'}}
        />
      </section>

      <SkipComponentButton componentToSkip='screen' nextComponent='resultado'/>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await api.get('/setup', {
    params: {
      pesquisa: 'MONITOR',
      situacao: 'A'
    },
  })

  const monitor = data.retorno.produtos.map(el => {
    const produto = el.produto;
    
    if(produto.nome.includes('GABINETE')) return null

    return { 
      name: produto.nome,
      price: produto.preco,
    }
  })

  return{
    props:{
      monitor: monitor.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}