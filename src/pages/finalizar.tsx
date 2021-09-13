/* eslint-disable @next/next/no-img-element */
import toast, { Toaster } from 'react-hot-toast';
import { ref, set } from '@firebase/database';
import {v4 as uuid} from 'uuid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import styles from '../styles/finalizar.module.scss';

export default function Finalizar() {
  const [feedback, setFeedback] = useState('')
  const router = useRouter()

  useEffect(() => {
    toast.success('Setup enviado!')
  }, [])

  async function handleSendFeedback () {
    const data = {
      feedback
    }

    try {
      set(ref(database, 'feedbacks/' + uuid()), {
        ...data
      });
    
    } catch (error) {
      console.log(error)
    }

    setFeedback('')
    router.push('/')
  }

  return (
    <main className={styles.container}>
      <Toaster />
      <div className={styles.pageContent}>
        <h5>✔️ Seu setup foi enviado para nossa equipe.</h5>
        <h2>Conte-nos a sua <span>experiência</span>!</h2>

        <div className={styles.sendFeedback}>
          {/* <p>Fala pra gente o que você achou da nossa plataforma</p> */}
          <textarea 
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            placeholder="Fala pra gente o que você achou da nossa plataforma!"
          />
          <button
            className={styles.sendFeedbackButton}
            onClick={handleSendFeedback}
          >
            Enviar Feedback
          </button>
        </div>
      </div>
    </main>
  )
}
