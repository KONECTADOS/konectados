import { useComputer } from '../../hooks/useComputer';
import styles from '../../styles/index.module.scss';

export default function Montagem(){
  const { currentComponent } = useComputer();

  return (
    <main className={styles.container}>
      <h2>{currentComponent}</h2>
      <p>Escolha um</p>
    </main>
  )
}