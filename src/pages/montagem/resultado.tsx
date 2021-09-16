import { v4 as uuid } from "uuid";
import {ref, set } from "firebase/database";
import { useRouter } from "next/router";
import { useState } from "react";
import { ResultTable } from "../../components/ResultTable";
import { Subtotal } from "../../components/Subtotal";
import { useComputer } from "../../hooks/useComputer"
import { database } from "../../services/firebase";
import styles from '../../styles/montagem.module.scss';
import { apiRoutes } from "../../services/api";

export default function Resultado() {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const { setup, setupPrice } = useComputer();

  async function handleSendSetup() {
    const data = {
      email,
      setup,
      price: setupPrice
    }

    try {
      await apiRoutes.post('/api/sendemail', {
        data
      })

      set(ref(database, 'setups/' + uuid()), {
        ...data
      });
    
    } catch (error) {
      console.log(error)
    }
    setEmail('')
    router.push('/finalizar')
  }

  return (
    <main className={styles.container}>
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
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite aqui o seu email!"/>
          <button type="button" onClick={handleSendSetup}>
            Enviar para um vendedor
          </button>
        </div>
      </section>
    </main>
  )
}