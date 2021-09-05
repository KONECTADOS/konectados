import React from 'react';
import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import processadores from '../../../processadores.json';
import placamae from '../../../placamae.json';
import { ComponentsTable } from '../../components/ComponentsTable';

export default function Montagem() {
  const { currentComponent, insertComponentIntoSetup, setup } = useComputer();
  console.log(setup)
  return (
    <main className={styles.container}>
      <section className={styles.componentInfo}>
        <div className={styles.componentName}>
          <h2>{currentComponent}</h2>
          <p>Escolha um processador para continuar.</p>
        </div>
        <Subtotal />
      </section>

      <section>
        <ComponentsTable 
          products={processadores}
          componentName={'cpu'}
        />
        { setup.cpu ? (
          <ComponentsTable 
            products={placamae}
            componentName={'motherboard'}
          />
        ) : (<></>)}
      </section>
      <button type="button" onClick={e => {
        insertComponentIntoSetup('Processador', processadores[0]);
      }}>
        Processador
      </button>
    </main>
  )
}