import React from 'react';
import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
// import hd from '../../../hd.json';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import { GetStaticProps } from 'next';
import { api } from '../../services/api';
import { getSizeInGb } from '../../utils/getSizeInGb';

export default function HardDisk({ hardDisk }) {
  return (
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>Hard Disk</h2>
          <p>Escolha um processador para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section className={styles.productTableSection}>
        <ComponentsTable 
          products={hardDisk}
          componentName={'hardDisk'}
          onChoose={{redirectTo: '/montagem/ssd'}}
        />
      </section>

      <SkipComponentButton componentToSkip='hardDisk' nextComponent='ssd'/>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await api.get('', {
    params: {
      pesquisa: 'HD ',
      situacao: 'A'
    },
  })

  const hardDisk = data.retorno.produtos.map(el => {
    const produto = el.produto;
    
    if(produto.nome.includes('PLACA')) return null
    const sizeInGb = getSizeInGb(produto.nome)
    if(sizeInGb === 0) return null
    return { 
      name: produto.nome,
      price: produto.preco,
      sizeInGb
    }
  })

  console.log(hardDisk)
  return{
    props:{
      hardDisk: hardDisk.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}
