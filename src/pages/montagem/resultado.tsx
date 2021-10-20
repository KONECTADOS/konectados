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
  const [isTelValid, setIsTelValid] = useState(false)
  const [sendToWhatsapp, setSendToWhatsapp] = useState(true)
  const router = useRouter()
  const { setup, setupPrice, setSetupLink, clearSetup } = useComputer();

  const whatsappNumber = '5511972264416';

  function handleChangeEmail(email) {
    const isAValidEmail = validateEmail(email);
    if (isAValidEmail) {
      setIsEmailValid(true)
    } else {
      setIsEmailValid(false)
    }
    setEmail(email)
  }


  async function handleSubmit(e) {
    e.preventDefault();


    const id = uuid()
    const now = new Date()
    const data = {
      email: email.toLowerCase(),
      phoneNumber,
      name,
      setup,
      price: setupPrice,
      montado: false,
      createdAt: now
    }

    try {
      
      set(ref(database, 'setups/' + id), {
        ...data
      }).then(() => {
        localStorage.removeItem('konecta@setup')
        if(sendToWhatsapp){
          let fanNames, ramMemoryNames, ramMemorySizeInGb, hdNames, hdSizeInGb, ssdNames, ssdSizeInGb

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
      
          const message = window.encodeURI(generateWhatsAppMessage({ ...setup, price: setupPrice, id }, name, phoneNumber, email))
          window.open(`https://wa.me/${whatsappNumber}?text=${message}`)
        }
        setSetupLink(`https://monteseupc.konectados.com.br/pc/${id}`)
        router.push('/finalizar')
      })
    } catch (error) {
      console.log(error);
    }
  }


  // async function saveSetupOnFirebase() {
  //   const data = {
  //     email: email.toLowerCase(),
  //     phoneNumber,
  //     name,
  //     setup,
  //     price: setupPrice,
  //     montado: false,
  //   }

  //   try {
  //     const id = uuid()
  //     set(ref(database, 'setups/' + id), {
  //       ...data
  //     }).then(() => {
  //       localStorage.removeItem('konecta@setup')
  //       const message = window.encodeURI(generateWhatsAppMessage({ ...setup, price: setupPrice, id }, name, phoneNumber))
  //       window.open(`https://wa.me/${whatsappNumber}?text=${message}`)
  //       router.push('/finalizar')
  //     })
  //   } catch (error) {
  //     console.log(error);

  //   }
  // }

  // async function handleSendSetup() {
  //   const html = generateHTMLEmail(setup, setupPrice, name, fanNames, ramMemoryNames, ramMemorySizeInGb, hdNames, hdSizeInGb, ssdNames, ssdSizeInGb)
  //   const data = {
  //     email: email.toLowerCase(),
  //     html,
  //   }

  //   try {

  //     // const sendEmailPromise = Email.send({
  //     //   SecureToken: "9c1044e6-afe6-43e9-87e4-12e04b95d014",
  //     //   To: [email.toLowerCase().trim()],
  //     //   Bcc: ["konectados@konectados.com.br"], 
  //     //   From: "konectados-dev@konectados.com.br",
  //     //   Subject: "Email em produção",
  //     //   Body: "Email em produção enviado"
  //     // })

  //     const sendEmailPromise = apiRoutes.post('/api/sendemail', {
  //       data
  //     });

  //     await toast.promise(sendEmailPromise, {
  //       loading: 'Enviando seu PC...',
  //       success: 'Setup enviado!',
  //       error: 'Erro ao enviar PC',
  //     });

  //     // set(ref(database, 'setups/' + uuid()), {
  //     //   ...data
  //     // });

  //     // setEmail('')
  //     // localStorage.removeItem('konecta@setup')
  //     // router.push("/finalizar")
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }


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

            <form  onSubmit={handleSubmit} className={styles.sendSetupForm}>
              <p>
                Envie seu PC para a nossa equipe
              </p>
              <input type="text" placeholder="Digite aqui seu nome" value={name} onChange={e => setName(e.target.value)} />
              <input type="email" value={email} onChange={e => handleChangeEmail(e.target.value)} placeholder="Digite aqui o seu e-mail" />
              <PhoneInput
                country={'br'}
                preferredCountries={['br', 'us', 'ar']}
                value={phoneNumber}
                onChange={phone => {
                  phone.length >= 12 ? setIsTelValid(true) : setIsTelValid(false)
                  setPhoneNumber(phone)
                }}
                placeholder="Digite aqui seu telefone"
              />

              <div className={styles.checkWhatsapp}>
                <input type="checkbox" name="" id="whatsapp" checked={sendToWhatsapp} onChange={e => setSendToWhatsapp(!sendToWhatsapp)}/>
                <label htmlFor="whatsapp" >Enviar mensagem para o WhatsApp da Konectados</label>
              </div>
              <button type="submit" disabled={!isEmailValid || !isTelValid || name.length < 3}>
                Enviar
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}