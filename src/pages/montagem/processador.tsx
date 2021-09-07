import React from 'react';
import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import processadores from '../../../processadores.json';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';

export default function Montagem() {
  const { currentComponent } = useComputer();

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
          products={processadores}
          componentName={'cpu'}
          onChoose={{redirectTo: '/montagem/placamae'}}
        />
      </section>

      {/* <SkipComponentButton nextComponent='motherboard'/> */}
    </main>
  )
}