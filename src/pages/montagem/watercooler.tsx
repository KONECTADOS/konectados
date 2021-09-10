import React, { useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import coolers from '../../../coolers.json';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import { GetStaticProps } from 'next';
import { api } from '../../services/api';
import { getSocketCompatibility } from '../../utils/getSocketCompatibility';

export default function WaterCooler({ waterCoolers }) {
  const [coolerList, setCoolerList] = useState([...waterCoolers])

  return (
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>Water Cooler</h2>
          <p>Escolha um processador para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section className={styles.productTableSection}>
        <ComponentsTable 
          products={coolerList}
          componentName={'waterCooler'}
          onChoose={{redirectTo: '/montagem/memoriaram'}}
        />
      </section>

      <SkipComponentButton componentToSkip='waterCooler' nextComponent='memoriaram'/>
    </main>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await api.get('', {
    params: {
      pesquisa: 'Water Cooler',
      situacao: 'A'
    },
  })

  const waterCoolers = data.retorno.produtos.map(el => {
    const produto = el.produto;

    const sockets = getSocketCompatibility(produto.nome)

    return { 
      name: produto.nome,
      price: produto.preco,
      socketCompatibility: sockets[0] ? sockets : ['Universal'],
    }
  })

  console.log(waterCoolers, data.retorno.produtos)
  return{
    props:{
      waterCoolers: waterCoolers.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}
