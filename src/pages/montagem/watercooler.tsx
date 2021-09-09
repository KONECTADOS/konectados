import React from 'react';
import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import coolers from '../../../coolers.json';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';

export default function WaterCooler() {
  const { currentComponent } = useComputer();

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
          products={coolers}
          componentName={'waterCooler'}
          onChoose={{redirectTo: '/montagem/memoriaram'}}
        />
      </section>

      <SkipComponentButton componentToSkip='waterCooler' nextComponent='memoriaram'/>
    </main>
  )
}