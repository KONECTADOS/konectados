import styles from './styles.module.scss';

export function SetupCard({ component }) {
  return (
    <div className={styles.wrapper}>
      <input type="checkbox" name="" id="" />
      <div className={styles.motherboardCard}>
        <p>Componente: <span>{(component.ramSizeInGb || component.sizeInGb) && `1x`} {component.description}</span></p>

        <main>
          {component.cpuSocket && <p>Soquete da CPU: <span>{component.cpuSocket}</span></p>}
          {component.ramSocket && <p>Soquete: <span>{component.ramSocket}</span></p>}
          {component.ramSizeInGb && <p>Memória: <span>{component.ramSizeInGb} Gb</span></p>}
          {component.frequencyInMhz && <p>Frequência: <span>{component.frequencyInMhz} Mhz</span></p>}
          {component.vRamSizeInGb && <p>Memória: <span>{component.vRamSizeInGb} Gb</span></p>}
          {component.powerInWatts && <p>Potência: <span>{component.powerInWatts} W</span></p>}
          {component.sizeInGb && <p>Memória: <span>{component.sizeInGb} Gb</span></p>}
          {component.socketCompatibility && <p>Compatibilidade: <span>{component.socketCompatibility.join(', ')}</span></p>}
        </main>

        <footer>
          <p className={styles.componentPrice}>Preço: <span>{new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(component.price)}</span></p>
        </footer>
      </div>
    </div>
  );
}