/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { ref, set } from '@firebase/database';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { database } from '../services/firebase';

import styles from '../styles/finalizar.module.scss';
import { useComputer } from '../hooks/useComputer';

export default function Finalizar() {
  const [feedback, setFeedback] = useState('')
  const router = useRouter()
  const { setup } = useComputer();

  async function handleSendFeedback() {
    const now = new Date()
    const data = {
      criadoEm: Number(now),
      feedback: feedback.slice(0, 100),
    }

    try {
      await set(ref(database, 'feedbacks/' + uuid()), {
        ...data,
      });

    } catch (error) {
      console.log(error)
    }

    setFeedback('')
    localStorage.removeItem('konecta@setup')
    router.push('/obrigado')
  }

  return (
    <>
      <Head>
        <title>Finalizar montagem | Konectados</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.pageContent}>
          <h5>✔️ Seu setup foi enviado para nossa equipe. <a href={setup.link}>Clique aqui para visualizar seu pc</a></h5>
          <h2>Conte-nos a sua <span>experiência</span>!</h2>


          <div className={styles.sendFeedback}>
            {/* <p>Fala pra gente o que você achou da nossa plataforma</p> */}
            <textarea
              value={feedback}
              onChange={e => feedback.length === 100 && e.target.value.length >= 100 ? null : setFeedback(e.target.value.slice(0,100))}
              placeholder="Fala pra gente o que você achou da nossa plataforma!"
            />
            <span style={{marginTop: '.5rem'}}>
              {feedback.length}/100
            </span>
            <button
              className={styles.sendFeedbackButton}
              onClick={handleSendFeedback}
            >
              Enviar Feedback
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
