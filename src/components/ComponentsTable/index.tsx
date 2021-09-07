import { useRouter } from 'next/dist/client/router';
import { useComputer } from '../../hooks/useComputer';
import styles from './styles.module.scss';

export function ComponentsTable({ products, componentName, onChoose }) {
  const { insertComponentIntoSetup, setup } = useComputer();
  const router = useRouter()

  function handleChoseComponent(product){
    insertComponentIntoSetup(componentName, product)
    router.push(onChoose.redirectTo)
  }

  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Componente</th>
            <th>Preço</th>
            { products[0].cpuSocket && (<th>Soquete</th>)}
            { products[0].ramSocket && (<th>Soquete</th>)}
            { products[0].socketCompatibility && (<th>Compatibilidade</th>)}
            { products[0].graphicCardSizeInCm && (<th>Tamanho (cm)</th>)}
            { products[0].cabinetSizeInCm && (<th>Tamanho (cm)</th>)}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => {
            if(componentName === 'motherboard'){
              if(setup.cpu.cpuSocket !== product.cpuSocket) return
            }
            if(componentName === 'ramMemory'){
              if(setup.motherboard.ramSocket !== product.ramSocket) return
            }
            if(componentName === 'waterCooler'){
              if(!product.socketCompatibility.includes(setup.cpu.cpuSocket)) return
            }

            if(componentName === 'pcCabinet'){
              if(setup.graphicCard.graphicCardSizeInCm > product.cabinetSizeInCm) {
                console.log(setup, product.cabinetSizeInCm)
              }
            }

            return (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(product.price)
                }</td>
                { product.cpuSocket && (<td>{product.cpuSocket}</td>)}
                { product.ramSocket && (<td>{product.ramSocket}</td>)}
                { product.socketCompatibility && (<td>{product.socketCompatibility.join(', ')}</td>)}
                { product.graphicCardSizeInCm && (<td>{product.graphicCardSizeInCm} cm</td>)}
                { product.cabinetSizeInCm && (<td>{product.cabinetSizeInCm} cm</td>)}
                <td>
                  <button type="button" onClick={e => {
                    handleChoseComponent(product)
                  }}>
                    Escolher
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  );
}