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

export default function PowerSupply({ powerSupply }) {
  return (
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>Fonte</h2>
          <p>Escolha um processador para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section className={styles.productTableSection}>
        <ComponentsTable 
          products={powerSupply}
          componentName={'powerSupply'}
          onChoose={{redirectTo: '/montagem/gabinete'}}
        />
      </section>

      {/* <SkipComponentButton nextComponent='gabinete'/> */}
    </main>
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
    
    if(produto.nome.includes('GABINETE')) return null

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
