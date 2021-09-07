import React from 'react';
import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import placamae from '../../../placamae.json';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';

export default function Montagem() {
  return (
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>Placa mãe</h2>
          <p>Escolha um processador para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section className={styles.productTableSection}>
        <ComponentsTable 
          products={placamae}
          componentName={'motherboard'}
          onChoose={{redirectTo: '/montagem/watercooler'}}
        />
      </section>

      {/* <SkipComponentButton nextComponent='waterCooler'/> */}
    </main>
  )
}