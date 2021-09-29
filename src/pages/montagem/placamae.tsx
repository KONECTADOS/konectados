import { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import Head from 'next/head';
import { useComputer } from '../../hooks/useComputer';
import { getCPUGenCompatibility } from '../../utils/getCPUGenCompatibility';
import { fetchStock } from '../../services/fetchStock';

export default function PlacaMae({  }) {
  const [motherboardList, setMotherboardList] = useState([])
  const { setup } = useComputer();

  useEffect(() => {
    const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))

    if(!estoqueEmCache){
      fetchStock('motherboards', setMotherboardList).then(() => console.log('Carregado!'))
    } else {
      setMotherboardList(estoqueEmCache.motherboards)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Placa mãe | Konectados</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>Placa mãe</h2>
            <p>Escolha uma placa mãe para continuar.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {motherboardList && motherboardList[0] ? (
            <ComponentsTable
              products={motherboardList}
              componentName={'motherboard'}
              onChoose={{ redirectTo: '/montagem/cooler' }}
            />
          ) : (
            <h3>Ops! Estamos realizando uma manutenção, logo a montagem estará disponível.</h3>
          )}
        </section>

      </main>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const { data } = await api.get('', {
//     params: {
//       pesquisa: 'Placa mãe',
//       situacao: 'A'
//     },
//   })

//   const motherboards = data.retorno.produtos.map(el => {
//     const produto = el.produto;

//     const coolerRegExp = new RegExp(/COOLER/);
//     if (produto.nome.search(coolerRegExp) !== -1) return null

//     const sockets = getSocketCompatibility(produto.nome)
//     const hasInStock = checkHasProductInStock(produto.nome, produto.codigo)
    
//     if(!hasInStock) return null


//     return {
//       name: produto.nome,
//       price: produto.preco,
//       cpuSocket: sockets[0] || null,
//       ramSocket: [...getRAMSocketCompatibility(produto.nome)][0]
//     }
//   })

//   return {
//     props: {
//       motherboards: motherboards.filter(el => el !== null),
//     },
//     revalidate: 1000 * 60 * 10 // 10 minutos 
//   }
// }