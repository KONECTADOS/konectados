import { useRouter } from 'next/dist/client/router';
import { useComputer } from '../../hooks/useComputer';
import styles from './styles.module.scss';

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
      <table>
        <thead>
          <tr>
            <th>Componente</th>
            <th>Preço</th>
            <th>Soquete</th>
            <th>Frequencia</th>
            <th>Capacidade</th>
            <th>Tamanho</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{setup.cpu.name}</td>
            <td>{
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'BRL',
              }).format(setup.cpu.price)
            }</td>
            <td>{setup.cpu.cpuSocket}</td>
            <td>{setup.cpu.maxRamFrequencyInMhz}</td>
            <td>{setup.cpu.maxRamSizeInGB}</td>
          </tr>

          <tr>
            <td>{setup.motherboard.name}</td>
            <td>{
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'BRL',
              }).format(setup.motherboard.price)
            }</td>
            <td>{setup.motherboard.cpuSocket}</td>
            <td>{setup.motherboard.maxRamFrequencyInMhz} Mhz</td>
            <td>{setup.motherboard.maxRamSizeInGB}</td>
          </tr>

          {setup.waterCooler.name !== 'skipped' && (
            <tr>
              <td>{setup.waterCooler.name}</td>
              <td>{
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(setup.waterCooler.price)
              }</td>
              <td>{setup.waterCooler.socketCompatibility.join(', ')}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          )}

          <tr>
            <td>{setup.ramMemory.name}</td>
            <td>{
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'BRL',
              }).format(setup.ramMemory.price)
            }</td>
            <td>{setup.ramMemory.ramSocket}</td>
            <td>{setup.ramMemory.frequencyInMhz} Mhz</td>
            <td>{setup.ramMemory.ramSizeInGb} Gb</td>
            <td>{setup.ramMemory.amount}</td>
          </tr>

          <tr>
            <td>{setup.graphicCard.name}</td>
            <td>{
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'BRL',
              }).format(setup.graphicCard.price)
            }</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>{setup.graphicCard.graphicCardSizeInCm} cm</td>
            {/* <td>{setup.graphicCard.amount}</td> */}
          </tr>

          {setup.hardDisk.name !== 'skipped' && (
            <tr>
              <td>{setup.hardDisk.name}</td>
              <td>{
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(setup.hardDisk.price)
              }</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>{setup.hardDisk.amount || '-'}</td>
            </tr>
          )}

          {setup.SSD.name !== 'skipped' && (
            <tr>
              <td>{setup.SSD.name}</td>
              <td>{
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(setup.SSD.price)
              }</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>{setup.SSD.amount || '-'}</td>
            </tr>
          )}

          <tr>
            <td>{setup.powerSupply.name}</td>
            <td>{
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'BRL',
              }).format(setup.powerSupply.price)

            }</td>
            <td>{setup.powerSupply.amount}</td>
          </tr>

          <tr>
            <td>{setup.pcCabinet.name}</td>
            <td>{
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'BRL',
              }).format(setup.pcCabinet.price)
            }
            </td>
            <td>{setup.pcCabinet.amount}</td>
            <td>{setup.pcCabinet.cabinetSizeInCm}</td>
          </tr>

          {setup.screen.name !== 'skipped' && (
            <tr>
              <td>{setup.screen.name}</td>
              <td>{
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(setup.screen.price)
              }</td>
              <td>{setup.screen.amount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}