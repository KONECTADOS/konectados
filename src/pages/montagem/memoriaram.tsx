import React from 'react';
import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import memoriaRam from '../../../memoriaram.json';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';

export default function MemoriaRam() {
  const { currentComponent } = useComputer();

  return (
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>{currentComponent}</h2>
          <p>Escolha um processador para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section className={styles.productTableSection}>
        <ComponentsTable 
          products={memoriaRam}
          componentName={'ramMemory'}
          onChoose={{redirectTo: '/montagem/memoriaram'}}
        />
      </section>

      <SkipComponentButton nextComponent='memoriaram'/>
    </main>
  )
}