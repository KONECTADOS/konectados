import { SetupCard } from './SetupCard';
import styles from './styles.module.scss';

export function DashboardSetup({ userSetup }) {

  const { setup } = userSetup
  return (
    <section className={styles.container}>
      <header>
        <h2>Especificações</h2>

        <p>{userSetup.email} • <span>{new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(userSetup.price)}</span></p>
      </header>

      <SetupCard
        component={setup.cpu}
      />
      <SetupCard
        component={setup.motherboard}
      />

      {setup.waterCooler.name !== 'skipped' && (
        <SetupCard
          component={setup.waterCooler}
        />
      )}

      {setup.ramMemory.ListOfComponents.map((el, index) => (
        <SetupCard
          component={el}
          key={index}
        />
      ))}

      <SetupCard
        component={setup.graphicCard}
      />

      {setup.hardDisk.ListOfComponents.map((el, index) => (
        <>
          {el.name !== 'skipped' && (
            <SetupCard
              component={el}
              key={index}
            />
          )}
        </>
      ))}

      {setup.SSD.ListOfComponents.map((el, index) => (
        <>
          {el.name !== 'skipped' && (
            <SetupCard
              component={el}
              key={index}
            />
          )}
        </>
      ))}

      <SetupCard
        component={setup.powerSupply}
      />
      <SetupCard
        component={setup.pcCabinet}
      />

      {setup.screen.name !== 'skipped' && (
        <SetupCard
          component={setup.screen}
        />
      )}

    </section>
  );
}