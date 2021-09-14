import { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import { api } from '../../services/api';
import { GetStaticProps } from 'next';
import { getSocketCompatibility } from '../../utils/getSocketCompatibility';

export default function Montagem({ cpus }) {
  const [cpuList, setCpuList] = useState([...cpus])

  return (
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>Processador</h2>
          <p>Escolha um processador para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section className={styles.productTableSection}>
        <ComponentsTable 
          products={cpuList}
          componentName={'cpu'}
          onChoose={{redirectTo: '/montagem/placamae'}}
        />
      </section>

      {/* <SkipComponentButton nextComponent='motherboard'/> */}
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await api.get('', {
    params: {
      pesquisa: 'Processador',
      situacao: 'A'
    },
  })

  const cpus = data.retorno.produtos.map(el => {
    const produto = el.produto;

    const coolerRegExp = new RegExp(/COOLER/);
    if(produto.nome.search(coolerRegExp) !== -1) return null

    const sockets = getSocketCompatibility(produto.nome)

    return { 
      name: produto.nome,
      price: produto.preco,
      cpuSocket: sockets[0] || null,
    }
  })

  return{
    props:{
      cpus: cpus.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}

