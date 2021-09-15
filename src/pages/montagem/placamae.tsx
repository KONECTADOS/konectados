import React, { useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import { GetStaticProps } from 'next';
import { api } from '../../services/api';
import { getSocketCompatibility } from '../../utils/getSocketCompatibility';
import { getRAMSocketCompatibility } from '../../utils/getRAMSocketCompatibility';

export default function Montagem({ motherboards }) {
  const [motherboardList, setMotherboardList] = useState([...motherboards])

  return (
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>Placa mãe</h2>
          <p>Escolha um processador para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section className={styles.productTableSection}>
        <ComponentsTable 
          products={motherboardList}
          componentName={'motherboard'}
          onChoose={{redirectTo: '/montagem/watercooler'}}
        />
      </section>

      {/* <SkipComponentButton nextComponent='waterCooler'/> */}
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await api.get('/setup', {
    params: {
      pesquisa: 'Placa mãe',
      situacao: 'A'
    },
  })

  const motherboards = data.retorno.produtos.map(el => {
    const produto = el.produto;

    const coolerRegExp = new RegExp(/COOLER/);
    if(produto.nome.search(coolerRegExp) !== -1) return null

    const sockets = getSocketCompatibility(produto.nome)

    return { 
      name: produto.nome,
      price: produto.preco,
      cpuSocket: sockets[0] || null,
      ramSocket: [...getRAMSocketCompatibility(produto.nome)][0]
    }
  })

  return{
    props:{
      motherboards: motherboards.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}