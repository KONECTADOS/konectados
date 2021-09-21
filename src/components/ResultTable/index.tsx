import { useRouter } from 'next/dist/client/router';
import { useComputer } from '../../hooks/useComputer';
import styles from './styles.module.scss';
import { ComponentCard } from './ComponentCard';

export function ResultTable() {
  const router = useRouter()
  const { setup } = useComputer();

  if (!setup.cpu) {
    return (
      <h4>Carregando</h4>
    )
  }
  return (
    <section className={styles.container}>
      <ComponentCard
        imageUrl='/icons/cpu.svg'
        componentName='Processador'
        component={setup.cpu}
      />
      <ComponentCard
        imageUrl='/icons/motherboard.svg'
        componentName='Placa mãe'
        component={setup.motherboard}
      />
      {setup.waterCooler.name !== 'skipped' && (
        <ComponentCard
          imageUrl='/icons/fan.svg'
          componentName='Cooler'
          component={setup.waterCooler}
        />
      )}
      <ComponentCard
        imageUrl='/icons/ram.svg'
        componentName='Memória RAM'
        component={setup.ramMemory}
      />
      <ComponentCard
        imageUrl='/icons/gpu.svg'
        componentName='Placa de vídeo'
        component={setup.graphicCard}
      />

      {setup.hardDisk.name !== 'skipped' && (
        <ComponentCard
          imageUrl='/icons/hd.svg'
          componentName='Hard Disk'
          component={setup.hardDisk}
        />
      )}
      {setup.SSD.name !== 'skipped' && (
        <ComponentCard
          imageUrl='/icons/ssd.svg'
          componentName='SSD'
          component={setup.SSD}
        />
      )}

      <ComponentCard
        imageUrl='/icons/powerSupply.svg'
        componentName='Fonte'
        component={setup.powerSupply}
      />
      <ComponentCard
        imageUrl='/icons/cabinet.svg'
        componentName='Gabinete'
        component={setup.pcCabinet}
      />

      {setup.fan.name !== 'skipped' && (
        <ComponentCard
          imageUrl='/icons/fan.svg'
          componentName='Fan'
          component={setup.fan}
        />
      )}
      {setup.monitor.name !== 'skipped' && (
        <ComponentCard
          imageUrl='/icons/monitor.svg'
          componentName='Monitor'
          component={setup.monitor}
        />
      )}
    </section>
  );
}