/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { apiRoutes } from '../../services/api';
import styles from '../styles/auth.module.scss';
import Head from 'next/head';


export default function Home() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter();

  async function handleLogIn(event) {
    event.preventDefault();
    try {
      const { data } = await axios.post('/api/auth', {
        password, user: user.trim()
      })

      if (!data.token) {
        toast.error('Usuário ou senha incorretos!')
        return
      }

      setCookie(null, 'token@konecta', data.token)
      router.push('/dashboard')
    } catch (error) {
      console.log(error.message)
      toast.error('Usuário ou senha incorretos!')
    }
  }

  return (
    <>
      <Head>
        <title>Autenticação | Konectados</title>
      </Head>
      <main className={styles.container}>
        <Toaster />
        <section className={styles.content}>
          <h3>Seja bem-vindo!</h3>
          <form action="">
            <input
              type="text"
              placeholder="Usuário"
              value={user}
              onChange={e => setUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Chave de acesso"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleLogIn}>Entrar</button>
          </form>
        </section>
      </main>
    </>
  )
}
