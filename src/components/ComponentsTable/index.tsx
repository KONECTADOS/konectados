import { useComputer } from '../../hooks/useComputer';
import styles from './styles.module.scss';

export function ComponentsTable({ products, componentName }) {
  const { insertComponentIntoSetup, setup } = useComputer();

  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Componente</th>
            <th>Preço</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => {
            if(componentName === 'motherboard'){
              if(setup.cpu.cpuSocket !== product.cpuSocket) return
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
                <td>
                  <button type="button" onClick={e => {
                    insertComponentIntoSetup(componentName, product)
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