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
import { generateHTMLEmail } from "../../utils/generateHTMLEmail";
import { Email } from "../../services/email";

export default function Resultado() {
  const [email, setEmail] = useState('')
  const [nameWhats, setNameWhats] = useState('')
  const [nameEmail, setNameEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)
  const router = useRouter()
  const { setup, setupPrice } = useComputer();

  const whatsappNumber = '5511972264416';
  let fanNames, ramMemoryNames, ramMemorySizeInGb, hdNames, hdSizeInGb, ssdNames, ssdSizeInGb

  if (typeof window !== 'undefined') {
    fanNames = !(setup.fan?.description === 'skipped') ? setup.fan.ListOfComponents.reduce((ac, el) => {
      return ac === '' ? el.description : `${ac}, ${el.description}`
    }, '') : null;
    ramMemoryNames = setup.ramMemory?.ListOfComponents.reduce((ac, el) => {
      return ac === '' ? el.description : `${ac}, ${el.description}`
    }, '')
    ramMemorySizeInGb = setup.ramMemory?.ListOfComponents.reduce((ac, el) => {
      return ac + (el.ramSizeInGb * el.amount);
    }, 0)

    hdNames = !(setup.hardDisk?.description === 'skipped') ? setup.hardDisk.ListOfComponents.reduce((ac, el) => {
      return ac === '' ? el.description : `${ac}, ${el.description}`
    }, '') : null
    hdSizeInGb = !(setup.hardDisk?.description === 'skipped') ? setup.hardDisk.ListOfComponents.reduce((ac, el) => {
      return ac + (el.sizeInGb * el.amount);
    }, 0) : null

    ssdNames = !(setup.SSD?.description === 'skipped') ? setup.SSD.ListOfComponents.reduce((ac, el) => {
      return ac === '' ? el.description : `${ac}, ${el.description}`
    }, '') : null

    ssdSizeInGb = !(setup.SSD?.description === 'skipped') ? setup.SSD.ListOfComponents.reduce((ac, el) => {
      return ac + (el.sizeInGb * el.amount);
    }, 0) : null

  }


  function handleChangeEmail(email) {
    const isAValidEmail = validateEmail(email);
    if (isAValidEmail) {
      setIsEmailValid(true)
    } else {
      setIsEmailValid(false)
    }
    setEmail(email)
  }

  // let message: string;

  // if (process.browser) {
  //   message = generateWhatsAppMessage({ ...setup, price: setupPrice }, nameWhats, phoneNumber)
  // }

  async function saveSetupOnFirebase() {
    const data = {
      email: email.toLowerCase(),
      phoneNumber,
      name: nameWhats,
      setup,
      price: setupPrice,
      montado: false,
    }

    try {
      const id = uuid()
      set(ref(database, 'setups/' + id), {
        ...data
      }).then(() => {
        localStorage.removeItem('konecta@setup')
        const message = window.encodeURI(generateWhatsAppMessage({ ...setup, price: setupPrice, id }, nameWhats, phoneNumber))
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`)
        router.push('/finalizar')
      })
    } catch (error) {
      console.log(error);

    }
  }

  async function handleSendSetup() {
    const html = generateHTMLEmail(setup, setupPrice, nameEmail, fanNames, ramMemoryNames, ramMemorySizeInGb, hdNames, hdSizeInGb, ssdNames, ssdSizeInGb)
    const data = {
      email: email.toLowerCase(),
      html,
    }

    try {

      const sendEmailPromise = Email.send({
        SecureToken: "78f5e571-325e-4e4a-833e-1affe50b368d",
        To: ['them@website.com'],
        Bcc: ["konectados@konectados.com.br"], 
        From: "konectados@konectados.com.br",
        Subject: "Email em produção",
        Body: "Email em produção enviado"
      })
      // const sendEmailPromise = apiRoutes.post('/api/sendemail', {
      //   data
      // });

      await toast.promise(sendEmailPromise, {
        loading: 'Enviando seu PC...',
        success: 'Setup enviado!',
        error: 'Erro ao enviar PC',
      });

      set(ref(database, 'setups/' + uuid()), {
        ...data
      });

      setEmail('')
      localStorage.removeItem('konecta@setup')
      router.push("/finalizar")
    } catch (error) {
      console.log(error)
    }

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
              <input type="text" placeholder="Digite aqui seu nome" value={nameWhats} onChange={e => setNameWhats(e.target.value)} />

              <PhoneInput
                country={'br'}
                preferredCountries={['br', 'us', 'ar']}
                value={phoneNumber}
                onChange={phone => setPhoneNumber(phone)}
                placeholder="Digite aqui seu telefone"
              />

              <button onClick={saveSetupOnFirebase} className={styles.sendWhatsapp}>
                <img src="/icons/whatsapp.svg" width="24px" height="24px" alt="" />
                Enviar
              </button>
            </div>

            <div className={styles.divider}>
              <p>ou</p>
            </div>

            <div className={styles.sendSetupForm}>
              <p>
                Enviar PC para o E-mail
              </p>
              <input type="text" placeholder="Digite aqui seu nome" value={nameEmail} onChange={e => setNameEmail(e.target.value)} />

              <input type="email" value={email} onChange={e => handleChangeEmail(e.target.value)} placeholder="Digite aqui o seu email!" />
              <button type="button" onClick={handleSendSetup} disabled={!isEmailValid}>
                Enviar
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}