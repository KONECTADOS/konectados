import styles from './styles.module.scss';
import Link from 'next/link';

export function NumberOfComponents({ components }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Categoria</th>
          <th>Produtos em estoque</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          // A iteração pode ser sfeita com Object.keys(components).map(key => (<tr>...</tr>)) mas tirará os componentes de ordem de montagem
        }
        <tr>
          <td>Processadores</td>
          <td>{components.cpus}</td>
          <td>
            <Link href={`/dashboard/estoque/editar/cpus`}>
              <a>Editar</a>
            </Link>
          </td>
        </tr>
        <tr>
          <td>Placas mãe</td>
          <td>{components.motherboards}</td>
          <td>
            <Link href={`/dashboard/estoque/editar/motherboards`}>
              <a>Editar</a>
            </Link>
          </td>

        </tr>
        <tr>
          <td>Coolers</td>
          <td>{components.coolers}</td>
          <td>
            <Link href={`/dashboard/estoque/editar/coolers`}>
              <a>Editar</a>
            </Link>
          </td>

        </tr>
        <tr>
          <td>Memórias RAM</td>
          <td>{components.ramMemories}</td>
          <td>
            <Link href={`/dashboard/estoque/editar/ramMemories`}>
              <a>Editar</a>
            </Link>
          </td>

        </tr>
        <tr>
          <td>Placas de vídeo</td>
          <td>{components.graphicCards}</td>
          <td>
            <Link href={`/dashboard/estoque/editar/graphicCards`}>
              <a>Editar</a>
            </Link>
          </td>

        </tr>
        <tr>
          <td>HDDs</td>
          <td>{components.hardDisks}</td>
          <td>
            <Link href={`/dashboard/estoque/editar/hardDisks`}>
              <a>Editar</a>
            </Link>
          </td>

        </tr>
        <tr>
          <td>SSDs</td>
          <td>{components.SSDs}</td>
          <td>
            <Link href={`/dashboard/estoque/editar/SSDs`}>
              <a>Editar</a>
            </Link>
          </td>

        </tr>
        <tr>
          <td>Fontes</td>
          <td>{components.powerSupplies}</td>
          <td>
            <Link href={`/dashboard/estoque/editar/powerSupplies`}>
              <a>Editar</a>
            </Link>
          </td>

        </tr>
        <tr>
          <td>Gabinetes</td>
          <td>{components.pcCabinets}</td>
          <td>
            <Link href={`/dashboard/estoque/editar/pcCabinets`}>
              <a>Editar</a>
            </Link>
          </td>

        </tr>
        <tr>
          <td>Fans</td>
          <td>{components.fans}</td>
          <td>
            <Link href={`/dashboard/estoque/editar/fans`}>
              <a>Editar</a>
            </Link>
          </td>

        </tr>
        <tr>
          <td>Monitores</td>
          <td>{components.monitors}</td>
          <td>
            <Link href={`/dashboard/estoque/editar/monitors`}>
              <a>Editar</a>
            </Link>
          </td>

        </tr>
      </tbody>
    </table>
  )
}