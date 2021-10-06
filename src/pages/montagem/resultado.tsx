import { v4 as uuid } from "uuid";
import { ref, set } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ResultTable } from "../../components/ResultTable";
import { Subtotal } from "../../components/Subtotal";
import { useComputer } from "../../hooks/useComputer"
import { database } from "../../services/firebase";
import styles from '../../styles/montagem.module.scss';
import { apiRoutes } from "../../services/api";
import Head from 'next/head';
import Link from 'next/link';
import toast, { Toaster } from "react-hot-toast";
import { validateEmail } from "../../utils/validateEmail";
import { generateWhatsAppMessage } from "../../utils/generateWhatsAppMessage";

export default function Resultado() {
  const [email, setEmail] = useState('rafa@email.com')
  const [name, setName] = useState('rafa')
  const [phoneNumber, setPhoneNumber] = useState('999999999')
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [sendToEmail, setSendToEmail] = useState(true)
  const router = useRouter()
  const { setup, setupPrice } = useComputer(); 
  
  function handleChangeEmail(email) {
    const isAValidEmail = validateEmail(email);
    if(isAValidEmail){
      setIsEmailValid(true)
    } else {
      setIsEmailValid(false)
    }
    setEmail(email)
  }

  let message: string;

  if(process.browser) {
    message = window.encodeURI(generateWhatsAppMessage(setup, name, email, phoneNumber))
    console.log(message);
    
  }

  async function handleSendSetup() {
  
    const data = {
      email: email.toLowerCase(),
      setup,
      price: setupPrice
    }
    
    try {
      
      const sendEmailPromise = sendToEmail ? apiRoutes.post('/api/sendemail', {
        data
      }) : null;

      sendToEmail &&  await toast.promise(sendEmailPromise, {
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
          <div className={styles.sendSetupForm}>
            <input type="email" value={email} onChange={e => handleChangeEmail(e.target.value)} placeholder="Digite aqui o seu email!" />
            <div>
              <input type="checkbox" name="" checked={sendToEmail} onChange={e => setSendToEmail(!sendToEmail)} id="sendEmail" />
              <label htmlFor="sendEmail">Enviar setup para meu e-mail.</label>
            </div>
            <Link href={`https://wa.me/send?phone=${phoneNumber}&text=${message}`} passHref>
              <a target="_blank" rel="noreferrer">Whats</a>
            </Link>
            <button type="button" onClick={handleSendSetup} disabled={!isEmailValid}>
              Enviar para um vendedor
            </button>
          </div>
        </section>
      </main>
    </>
  )
}