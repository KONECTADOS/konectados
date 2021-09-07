import { ResultTable } from "../../components/ResultTable";
import { Subtotal } from "../../components/Subtotal";
import { useComputer } from "../../hooks/useComputer"
import styles from '../../styles/montagem.module.scss';

export default function Resultado() {
  return (
    <main className={styles.container}>
      <section className={styles.resultsContainer}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>Processador</h2>
            <p>Escolha um processador para continuar.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          <ResultTable />
        </section>

      </section>
    </main>
  )
}