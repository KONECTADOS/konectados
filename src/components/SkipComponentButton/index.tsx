import { useRouter } from 'next/router';
import { useComputer } from '../../hooks/useComputer';
import styles from './styles.module.scss';

export function SkipComponentButton({ componentToSkip, nextComponent }) {
  const { skipComponent } = useComputer();
  const router = useRouter();

  function handleSkipComponent() {
    skipComponent(componentToSkip);
    router.push(`/montagem/${nextComponent}`)
  }

  return (
    <div className={styles.wrapper}>

      <button className={styles.skipButton}
        onClick={handleSkipComponent}
      >
        Pular
      </button>
    </div>
  );
}