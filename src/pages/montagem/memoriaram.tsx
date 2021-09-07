import React from 'react';
import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import memoriaRam from '../../../memoriaram.json';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';

export default function MemoriaRam() {
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
          products={memoriaRam}
          componentName={'ramMemory'}
          onChoose={{redirectTo: '/montagem/placadevideo'}}
        />
      </section>

      {/* <SkipComponentButton nextComponent='placadevideo'/> */}
    </main>
  )
}