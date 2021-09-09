import React from 'react';
import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import ssd from '../../../ssd.json';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';

export default function MemoriaRam() {
  return (
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>SSD</h2>
          <p>Escolha um processador para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section className={styles.productTableSection}>
        <ComponentsTable 
          products={ssd}
          componentName={'SSD'}
          onChoose={{redirectTo: '/montagem/fonte'}}
        />
      </section>

      <SkipComponentButton componentToSkip='SSD' nextComponent='fonte'/>
    </main>
  )
}