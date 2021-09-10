import { useComputer } from '../../../hooks/useComputer';
import styles from './styles.module.scss';
import Image from 'next/image'

export function ComponentCard({ componentName, component, imageUrl }) {
  const { setup } = useComputer();
  if (!setup.cpu) {
    return (
      <h4>Carregando</h4>
    )
  }

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.imageWrapper}>
          <Image width="52px" height="52px" src={imageUrl} alt="" />
        </div>
        <span className={styles.componentName}>{componentName}</span>
      </header>

      <main>
        <p className={styles.componentName}>{component.name}</p>

        {componentName === 'Processador' && (
          <p>Soquete: {component.cpuSocket}</p>
        )}
        {componentName === 'Placa mãe' && (
          <>
            <p>Soquete: {component.cpuSocket}</p>
            <p>Soquete: {component.ramSocket}</p>
            {/* <p>Max. RAM: {component.maxRamSizeInGb} Gb</p> */}
            {/* <p>Max. frequência: {component.maxRamFrequencyInMhz} Mhz</p> */}
          </>
        )}
        {componentName === 'Memória RAM' && (
          <>
            <p>Soquete: {component.ramSocket}</p>
            <p>Memória: {component.ramSizeInGb} Gb</p>
            <p>Frequência: {component.frequencyInMhz} Mhz</p>
          </>
        )}
        {componentName === 'Water Cooler' && (
          <p>Soquete(s): {component.socketCompatibility.join(', ')}</p>
        )}
        {componentName === 'Placa de vídeo' && (
          <p>Tamanho: {component.graphicCardSizeInCm} cm</p>
        )}
        {componentName === 'Gabinete' && (
          <p>Tamanho: {component.cabinetSizeInCm} cm</p>
        )}
      </main>

      <footer>
        <span>
          {
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(component.price)
          }
        </span>
      </footer>
    </div>
  );
}