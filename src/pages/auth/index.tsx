/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../../styles/auth.module.scss';
import Head from 'next/head';
import { auth } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuth()
  const router = useRouter();

  async function handleLogIn(event) {
    event.preventDefault();

    const {isAuth} = await signIn(email, password)

    if(isAuth){
      router.push('/dashboard')
    } else {
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
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
