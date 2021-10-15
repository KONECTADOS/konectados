import { get, ref } from "@firebase/database";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { DashboardSetup } from "../../components/DashboardSetup";
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
  const [validationType, setValidationType] = useState('');

  useEffect(() => {
    setIsLoading(true)
    fetchSetup().then(data => {
      data.email ? setValidationType('E-mail') : setValidationType('Telefone')
      setIsLoading(false)
    })
  }, [])

  async function verify() {
    console.log(validator, setup)
    if (validationType === 'E-mail') {
      if (validator === setup.email) {
        setIsValid(true)
      }
    } else {
      if (validator === setup.phoneNumber) {
        setIsValid(true)
      }
    }
  }

  const fetchSetup = async () => {
    const snapshot = await get(ref(database, 'setups/' + id))
    const data = snapshot.val();

    setSetup(data);
    return data
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
              />
            ) : (
              <div className={styles.validation}>
                <h2>Confirme sua <span>identidade</span></h2>
                <input type="text" value={validator} onChange={e => setValidator(e.target.value)} placeholder={validationType} />
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

  console.log(id);


  return {
    props: {
      id,
    }
  }
}