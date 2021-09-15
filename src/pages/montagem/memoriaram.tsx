import React from 'react';
// import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
// import memoriaRam from '../../../memoriaram.json';
import { ComponentsTable } from '../../components/ComponentsTable';
// import { SkipComponentButton } from '../../components/SkipComponentButton';
import { getRAMSocketCompatibility } from '../../utils/getRAMSocketCompatibility';
import { GetStaticProps } from 'next';
import { api } from '../../services/api';
import { getRamFrequencyInMhz } from '../../utils/getRAMFrequencyInMhz';
import { getSizeInGb } from '../../utils/getSizeInGb';

export default function MemoriaRam({ ramMemory }) {
  return (
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>Memória RAM</h2>
          <p>Escolha um processador para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section className={styles.productTableSection}>
        <ComponentsTable 
          maxItems={4}
          products={ramMemory}
          componentName={'ramMemory'}
          moreThanOne={true}
          onChoose={{redirectTo: '/montagem/placadevideo'}}
        />
      </section>

      {/* <SkipComponentButton nextComponent='placadevideo'/> */}
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await api.get('', {
    params: {
      pesquisa: 'memoria',
      situacao: 'A'
    },
  })

  const ramMemory = data.retorno.produtos.map(el => {
    const produto = el.produto;

    const sockets = getRAMSocketCompatibility(produto.nome)
    if(produto.nome.includes("CARTÃO")) return null
    return { 
      name: produto.nome,
      price: produto.preco,
      ramSocket: sockets[0] || null,
      ramSizeInGb: getSizeInGb(produto.nome),
      frequencyInMhz: getRamFrequencyInMhz(produto.nome),
    }
  })

  return{
    props:{
      ramMemory: ramMemory.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}
