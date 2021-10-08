import { get } from '@firebase/database';
import { ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Feedbacks } from '../../components/Feedbacks';
import { SetupsTable } from '../../components/SetupsTable';
import { database } from '../../services/firebase';
import styles from '../../styles/dashboard.module.scss';
import toast, { Toaster } from 'react-hot-toast';
import router from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function Dashboard({admin}) {
  const [setups, setSetups] = useState([])
  const [feedbacks, setFeedbacks] = useState([])
  const {user} = useAuth()

  useEffect(() => {
    if(user && user?.id && (user?.email !== admin.email || user?.id !== admin.id)){
      router.push('/auth')
    }

    const fetchData = async () => {
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
    }

    const promise = user ? fetchData() : null

    user && toast.promise(promise, {
      loading: 'Carregando...',
      success: 'Dashboard carregado!',
      error: () => {
        if(!user) router.push('/auth')
        return 'Erro ao carregar setups, tente recarregar a página.'
      },
    })
  }, [user, admin])

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
  const { konectados } = parseCookies(ctx)

  if(!konectados){
    return {
      redirect:{
        destination: '/auth',
        permanent: false,
      }
    }
  }
  
  const admin = JSON.parse(konectados)

  
  if(!admin || !admin.email || !admin.id) {
    return {
      redirect:{
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return {
    props: {
      admin,
    }
  }
}