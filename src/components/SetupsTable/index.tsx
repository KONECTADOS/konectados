import styles from './styles.module.scss';
import Link from 'next/link';

export function SetupsTable({ setups }) {

  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Envio</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>WhatsApp</th>
            <th>Preço</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {setups.map((setup, index) => {
            const date = new Date(setup.createdAt);
            const criadoEm = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            return (
              <tr key={index}>
                <td>
                  <time>{criadoEm}</time>
                </td>
                <td>
                  {setup.name}
                </td>
                <td>{setup.email}</td>
                <td>{setup.phoneNumber}</td>
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