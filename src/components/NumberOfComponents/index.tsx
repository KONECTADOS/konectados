import styles from './styles.module.scss';

export function NumberOfComponents({ components }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Categoria</th>
          <th>Produtos em estoque</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Processadores</td>
          <td>{components.cpus}</td>
        </tr>
        <tr>
          <td>Placas mãe</td>
          <td>{components.motherboards}</td>
        </tr>
        <tr>
          <td>Coolers</td>
          <td>{components.coolers}</td>
        </tr>
        <tr>
          <td>Memórias RAM</td>
          <td>{components.ramMemories}</td>
        </tr>
        <tr>
          <td>Placas de vídeo</td>
          <td>{components.graphicCards}</td>
        </tr>
        <tr>
          <td>HDDs</td>
          <td>{components.hardDisks}</td>
        </tr>
        <tr>
          <td>SSDs</td>
          <td>{components.SSDs}</td>
        </tr>
        <tr>
          <td>Fontes</td>
          <td>{components.powerSupplies}</td>
        </tr>
        <tr>
          <td>Gabinetes</td>
          <td>{components.pcCabinets}</td>
        </tr>
        <tr>
          <td>Fans</td>
          <td>{components.fans}</td>
        </tr>
        <tr>
          <td>Monitores</td>
          <td>{components.monitors}</td>
        </tr>
      </tbody>
    </table>
  )
}