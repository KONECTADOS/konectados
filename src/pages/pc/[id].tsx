import { get, ref } from "@firebase/database";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { DashboardSetup } from "../../components/DashboardSetup";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import styles from './styles.module.scss';

type PCProps = {
  id: string
}


export default function PC({ id }: PCProps) {
  const [setup, setSetup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [validator, setValidator] = useState('');
  // const [validationType, setValidationType] = useState('');
  const { user } = useAuth();

  
  useEffect(() => {
    const fetchSetup = async () => {
      const snapshot = await get(ref(database, 'setups/' + id))
      const data = snapshot.val();
  
      setSetup(data);
      return data
    }
    
    setIsLoading(true)
    fetchSetup().then(data => {
      // data.email ? setValidationType('E-mail') : setValidationType('Telefone')
      setIsLoading(false)
    })
  }, [id])

  async function verify() {
    console.log(validator, setup)
    if (validator === setup.email || '55' + validator === setup.phoneNumber || validator === 'konectados@adm' || (user && user?.id)) {
      setIsValid(true)
    }
  }

  return (
    <>
    <Head>
      <title>Meu PC</title>
    </Head>
    <main>
      <section className={styles.wrapper}>
        {isLoading ? (
          <h2>Carregando...</h2>
        ) : (
          <>
            {setup && isValid ? (
              <DashboardSetup
                userSetup={setup}
                isUser
              />
            ) : (
              <div className={styles.validation}>
                <h2>Confirme sua <span>identidade</span></h2>
                <input type="text" value={validator} onChange={e => setValidator(e.target.value)} placeholder="E-mail ou telefone (xx) xxxxx-xxxx" />
                <button type="button" onClick={verify}>Verificar</button>
              </div>
            )}
          </>
        )
        }
      </section>
    </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  return {
    props: {
      id,
    }
  }
}