/* eslint-disable @next/next/no-img-element */
import { v4 as uuid } from "uuid";
import { ref, set } from "firebase/database";
import { useRouter } from "next/router";
import { useState } from "react";
import { ResultTable } from "../../components/ResultTable";
import { Subtotal } from "../../components/Subtotal";
import { useComputer } from "../../hooks/useComputer"
import { database } from "../../services/firebase";
import styles from '../../styles/montagem.module.scss';
import { apiRoutes } from "../../services/api";
import Head from 'next/head';
import toast, { Toaster } from "react-hot-toast";
import { validateEmail } from "../../utils/validateEmail";
import { generateWhatsAppMessage } from "../../utils/generateWhatsAppMessage";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function Resultado() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)
  const router = useRouter()
  const { setup, setupPrice } = useComputer();

  function handleChangeEmail(email) {
    const isAValidEmail = validateEmail(email);
    if (isAValidEmail) {
      setIsEmailValid(true)
    } else {
      setIsEmailValid(false)
    }
    setEmail(email)
  }

  let message: string;

  if (process.browser) {
    message = window.encodeURI(generateWhatsAppMessage({ ...setup, price: setupPrice }, name, phoneNumber))
  }

  async function saveSetupOnFirebase() {
    const data = {
      email: email.toLowerCase(),
      setup,
      price: setupPrice
    }

    try {
      set(ref(database, 'setups/' + uuid()), {
        ...data
      });
    } catch (error) {
      
    }
  }

  async function handleSendSetup() {

    const data = {
      email: email.toLowerCase(),
      setup,
      price: setupPrice
    }

    try {

      const sendEmailPromise = apiRoutes.post('/api/sendemail', {
        data
      });

      await toast.promise(sendEmailPromise, {
        loading: 'Enviando seu PC...',
        success: 'Setup enviado!',
        error: 'Erro ao enviar PC',
      });

      set(ref(database, 'setups/' + uuid()), {
        ...data
      });

    } catch (error) {
      console.log(error)
    }

    setEmail('')
    router.push("/finalizar")
  }


  return (
    <>
      <Head>
        <title>Resultado | Konectados</title>
      </Head>
      <main className={styles.container}>
        <Toaster />
        <section className={styles.resultsContainer}>
          <div className={styles.componentInfo}>
            <div className={styles.componentName}>
              <h2>Meu <span>PC</span></h2>
              <p>Confirme as suas configurações.</p>
            </div>
            <Subtotal />
          </div>

          <div className={styles.productTableSection}>
            <ResultTable />
          </div>

          <a className={styles.finishLink} href="#sendSetup">Finalizar Montagem</a>
        </section>

        <section className={styles.sendSetup} id="sendSetup">
          <h3>Terminou de montar o <span>PC dos seus sonhos</span>? Envie agora mesmo para um de nossos vendedores</h3>
          <div className={styles.wrapper}>


            <div className={styles.sendToWhatsapp}>
              <p>
                Enviar PC para o WhatsApp da Konectados
              </p>
              <input type="text" placeholder="Digite aqui seu nome" value={name} onChange={e => setName(e.target.value)} />

              <PhoneInput
                country={'br'}
                preferredCountries={['br', 'us', 'ar']}
                value={phoneNumber}
                onChange={phone => setPhoneNumber(phone)}
                placeholder="Digite aqui seu telefone"
              />

              <a target="_blank" href={`https://wa.me/send?phone=${phoneNumber.replace('+', '')}&text=${message}`} onClick={saveSetupOnFirebase} rel="noreferrer">
                <img src="/icons/whatsapp.svg" width="24px" height="24px" alt="" />
                Enviar
              </a>
            </div>

            <div className={styles.divider}>
              <p>ou</p>
            </div>

            <div className={styles.sendSetupForm}>
              <p>
                Enviar PC para o E-mail da Konectados
              </p>
              <input type="email" value={email} onChange={e => handleChangeEmail(e.target.value)} placeholder="Digite aqui o seu email!" />
              <button type="button" onClick={handleSendSetup} disabled={!isEmailValid}>
                Enviar para um vendedor
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}