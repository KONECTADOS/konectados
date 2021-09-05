import { useComputer } from '../../hooks/useComputer';
import styles from './styles.module.scss';

export function SkipComponentButton({ nextComponent }) {
  // const { changeCurrentComponent } = useComputer();

  return (
    <button className={styles.skipButton} 
    // onClick={e => {
    //   changeCurrentComponent(nextComponent);
    // }}
    >
      Pular
    </button>
  );
}