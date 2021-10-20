import { useRouter } from 'next/router';
import { useComputer } from '../../hooks/useComputer';
import styles from './styles.module.scss';

export function Subtotal() {
  const { setupPrice, clearSetup } = useComputer();

  const router = useRouter()

  function handleReset(){
    localStorage.removeItem('konecta@setup');
    clearSetup()
    router.push('/montagem/processador')
  }
  return (
    <div className={styles.wrapper}>
      <p className={styles.subtotal}>
        Valor total:
        <span>{
          new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(setupPrice)
        }
        </span>
      </p>
      <button onClick={handleReset}>Recomeçar</button>
    </div>
  );
}