import React from 'react';
import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import hd from '../../../hd.json';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';

export default function MemoriaRam() {
  return (
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>Hard Disk</h2>
          <p>Escolha um processador para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section className={styles.productTableSection}>
        <ComponentsTable 
          products={hd}
          componentName={'hardDisk'}
          onChoose={{redirectTo: '/montagem/ssd'}}
        />
      </section>

      <SkipComponentButton componentToSkip='hardDisk' nextComponent='ssd'/>
    </main>
  )
}