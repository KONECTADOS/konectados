import React from 'react';
import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import { GetStaticProps } from 'next';
import { api } from '../../services/api';

export default function Gabinete({ pcCabinet }) {
  return (
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>Gabinete</h2>
          <p>Escolha um processador para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section className={styles.productTableSection}>
        {pcCabinet && pcCabinet[0] ? (
          <ComponentsTable
            products={pcCabinet}
            componentName={'pcCabinet'}
            onChoose={{ redirectTo: '/montagem/monitor' }}
          />
        ) : (
          <h3>Ops! Estamos realizando uma manutenção, logo a montagem estará disponível.</h3>
        )}
      </section>

      {/* <SkipComponentButton nextComponent='monitor'/> */}
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get('', {
    params: {
      pesquisa: 'GABINETE',
      situacao: 'A'
    },
  })

  const pcCabinet = data.retorno.produtos.map(el => {
    const produto = el.produto;

    // if (!produto.nome.includes(' - ')) return null
    if (produto.nome.includes('C/FONTE')) return null
    if (produto.nome.includes('SUPORTE PARA GABINETE')) return null
    if (produto.nome.includes('COOLER PARA')) return null
    if (produto.nome.includes('COOLER FAN PARA')) return null

    return {
      name: produto.nome,
      price: produto.preco,
    }
  })

  return {
    props: {
      pcCabinet: pcCabinet.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}
