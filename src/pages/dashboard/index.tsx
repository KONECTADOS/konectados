import { get } from '@firebase/database';
import { ref } from 'firebase/database';
import { GetServerSideProps } from 'next';
import  { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { Feedbacks } from '../../components/Feedbacks';
import { SetupsTable } from '../../components/SetupsTable';
import { database } from '../../services/firebase';
import styles from '../../styles/dashboard.module.scss';
import Head from 'next/head';
import toast, { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const [setups, setSetups] = useState([])
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const promise = (async () => {
      await get(ref(database, 'setups/')).then(snapshot => {
        const data = snapshot.val()
        const newSetup = []
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            newSetup.push({ ...data[key], id: key })
          }
        }
  
        setSetups(newSetup)
      });
  
      await get(ref(database, 'feedbacks/')).then(snapshot => {
        const data = snapshot.val()
        const newFeedbacks = []
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            newFeedbacks.push({ ...data[key], id: key })
          }
        }
        setFeedbacks(newFeedbacks)
      });
    })()

    toast.promise(promise, {
      loading: 'Carregando...',
      success: 'Dashboard carregado!',
      error: 'Erro ao carregar setups, tente recarregar a página.',
    })
  }, [])

  return (
    <main className={styles.container}>
      <Toaster />
      <section className={styles.dashboardContent}>
        <h2>Setups</h2>

        <SetupsTable
          setups={setups}
        />

        <Feedbacks
          feedbacks={feedbacks}
        />
      </section>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = parseCookies(ctx, 'token@konecta')

  if(!token['token@konecta']){
    return {
      redirect: {
        permanent: false,
        destination: '/auth'
      }
    }
  }
  return {
    props: {}
  }
}