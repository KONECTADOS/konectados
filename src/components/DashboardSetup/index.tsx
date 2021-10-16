import { ref, remove, set } from '@firebase/database';
import router from 'next/router';
import { useState } from 'react';
import { database } from '../../services/firebase';
import { SetupCard } from './SetupCard';
import styles from './styles.module.scss';

export function DashboardSetup({ userSetup, isUser }: { userSetup: any; isUser?: boolean }) {
  const [isLoading, setIsLoading] = useState(false)
  const { setup } = userSetup

  async function deleteSetup() {
    try {

      setIsLoading(true);
      await remove(ref(database, 'setups/' + userSetup.id))
      router.push('/dashboard')
    } catch (error) {
      console.log(error, 'erro');
      setIsLoading(false)
    }
  }

  async function updateSetup() {
    setIsLoading(true)
    try {

      await set(ref(database, 'setups/' + userSetup.id), {
        ...userSetup, montado: true
      })
      router.push('/dashboard')
    } catch (error) {
      console.log(error, 'erro');
      setIsLoading(false)
    }
  }
  return (
    <section className={styles.container}>
      {isLoading ? (
        <div className="loading">

        </div>
      ) : (
        <>
          <header>
            <h2>Especificações</h2>

            <p>{userSetup.email || `WhatsApp: +${userSetup.phoneNumber}`} • <span>{new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(userSetup.price)}</span></p>
          </header>

          {Object.keys(setup).map(key => {
            if (key === 'waterCooler' && setup[key].description === 'skipped') return null
            if (key === 'graphicCard' && setup[key].description === 'skipped') return null
            if (key === 'fan' && setup[key].description === 'skipped') return null
            if (key === 'monitor' && setup[key].description === 'skipped') return null

            if (key === 'SSD' || key === 'hardDisk' || key === 'fan') {
              return (
                <>
                  {setup[key].ListOfComponents?.map((el, index) => (
                    <SetupCard
                      component={el}
                      key={index}
                    />
                  ))}
                </>
              )
            }

            return (
              <SetupCard
                key={key}
                component={setup[key]}
              />
            )
          })}

          {isUser ? (
            <></>
          ) : (
            <div className={styles.changeStatus}>
              <button onClick={updateSetup} className={styles.update}>Marcar como {userSetup.montado ? 'não montado' : 'montado'}</button>
              <button onClick={deleteSetup}>Apagar</button>
            </div>
          )}
        </>
      )}
    </section>
  );
}