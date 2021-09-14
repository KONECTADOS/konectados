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
        <p className={styles.componentName} style={{
          fontSize: componentName === 'Memória RAM' || componentName === 'Hard Disk' || componentName === 'SSD' ? '.8rem' : '1rem'
        }}>
          {
            componentName === 'Memória RAM'
              || componentName === 'Hard Disk'
              || componentName === 'SSD'
              ? `${component.ListOfComponents.reduce((ac, el) => {
                if(typeof ac === 'string') return `${ac}, ${el.ramSizeInGb}`
                return `${ac.name}, ${el.name}`
              })} `
              : component.name
          }
        </p>

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
            <p>Soquete: {component.ListOfComponents[0].ramSocket}</p>
            <p>Memória: {component.ListOfComponents.reduce((ac, el) =>{
              if(typeof ac === 'number') return ac + el.ramSizeInGb
              return ac.ramSizeInGb + el.ramSizeInGb
            })} Gb</p>
            <p>Frequência: {component.ListOfComponents[0].frequencyInMhz} Mhz</p>
          </>
        )}
        {/* {componentName === 'Hard Disk' && (
          <>
            <p>Memória: {component.ListOfComponents.reduce((ac, el) =>{
              if(typeof ac === 'number') return ac + el.sizeInGb
              return ac.sizeInGb + el.sizeInGb
            })} Gb</p>
          </>
        )} */}
        {/* {componentName === 'SSD' && (
          <>
            <p>Memória: {component.ListOfComponents.reduce((ac, el) =>{
              if(typeof ac === 'number') return ac + el.sizeInGb
              console.log(ac)
              return ac.sizeInGb + el.sizeInGb
            })} Gb</p>
          </>
        )} */}
        {componentName === 'Water Cooler' && (
          <p>Soquete(s): {component.socketCompatibility.join(', ')}</p>
        )}
        {componentName === 'Placa de vídeo' && (
          <>
          <p>Memória: {component.vRamSizeInGb} Gb</p>
          {
            component.graphicCardSizeInCm && <p>Tamanho: {component.graphicCardSizeInCm} cm</p>
          }
          </>
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