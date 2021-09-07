import { useComputer } from '../../hooks/useComputer';
import styles from '../../styles/index.module.scss';

export default function Montagem(){
  const { currentComponent } = useComputer();

  return (
    <main className={styles.container}>
      <h2>Como funciona a montagem do PC?</h2>
      <p>Escolha um</p>
    </main>
  )
}