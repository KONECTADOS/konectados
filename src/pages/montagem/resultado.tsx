import { ResultTable } from "../../components/ResultTable";
import { Subtotal } from "../../components/Subtotal";
import { useComputer } from "../../hooks/useComputer"
import styles from '../../styles/montagem.module.scss';

export default function Resultado() {
  return (
    <main className={styles.container}>
      <section className={styles.resultsContainer}>
        <div className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>Meu <span>PC</span></h2>
            <p>Confirme as suas configurações.</p>
          </div>
          <Subtotal />
        </div>

        <div className={styles.productTableSection}>
          <ResultTable />
        </div>

      </section>
    </main>
  )
}