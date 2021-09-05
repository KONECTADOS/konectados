import { useComputer } from '../../hooks/useComputer';
import styles from './styles.module.scss';

export function Subtotal() {
  const { setupPrice } = useComputer();

  return (
    <p className={styles.subtotal}>
      Valor total:
      <span>{
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'BRL',
        }).format(setupPrice)
      }
      </span>
    </p>
  );
}