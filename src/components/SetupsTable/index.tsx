import styles from './styles.module.scss';
import Link from 'next/link';

export function SetupsTable({ setups }) {

  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Contato</th>
            <th>Preço</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {setups.map((setup, index) => {
            console.log(setup.id);
            
            return (
              <tr key={index}>
                <td>{setup.name || 'Sem nome'} | {setup.email || `WhatsApp: ${setup.phoneNumber}`}</td>
                <td>{
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(setup.price)
                }</td>

                <td>
                  <Link href={`/dashboard/${setup.id}`} passHref>
                    <button>
                      Ver Setup
                    </button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  );
}