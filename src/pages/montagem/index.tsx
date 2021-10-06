import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../../styles/montagem.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import { ComponentExample } from '../../components/ComponentExample';

export default function Montagem() {

  useEffect(() => {
    if (localStorage.getItem('konecta@setup')) {
      localStorage.removeItem('konecta@setup')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Montagem | Konectados</title>
      </Head>
      <main className={styles.container}>

        <section className={styles.contentHelp}>

          <h2>Como funciona a <br /> montagem do <span>PC?</span></h2>
          <p>Você escolherá pelo menos 6 componentes, e ao final, será apresentado
            o valor estimado do seu setup. Não se preocupe, você não irá precisar fazer cadastro ou pagar alguma taxa, nossa plataforma é <span>Gratuita. </span>
            Aqui você irá encontrar:</p>

          <ol>
            <li><Image src="/icons/cpu.svg" width="32px" height="32px" alt="" /> Processador </li>
            <li><Image src="/icons/motherboard.svg" width="32px" height="32px" alt="" /> Placa mãe </li>
            <li><Image src="/icons/fan.svg" width="32px" height="32px" alt="" /> Cooler <span>(Opcional)</span></li>
            <li><Image src="/icons/ram.svg" width="32px" height="32px" alt="" /> Memória RAM </li>
            <li><Image src="/icons/gpu.svg" width="32px" height="32px" alt="" /> Placa de vídeo </li>
            <li><Image src="/icons/hd.svg" width="32px" height="32px" alt="" /> HDs <span>(Opcional)</span></li>
            <li><Image src="/icons/ssd.svg" width="32px" height="32px" alt="" /> SSDs <span>(Opcional)</span></li>
            <li><Image src="/icons/powerSupply.svg" width="32px" height="32px" alt="" /> Fonte </li>
            <li><Image src="/icons/cabinet.svg" width="32px" height="32px" alt="" /> Gabinete</li>
            <li><Image src="/icons/fan.svg" width="32px" height="32px" alt="" /> FANs <span>(Opcional)</span></li>
            <li><Image src="/icons/monitor.svg" width="32px" height="32px" alt="" /> Monitor <span>(Opcional)</span></li>
          </ol>
        </section>

        <ComponentExample />
        
        <div className={styles.start}>
          <Link href="/montagem/processador">
            <a>Iniciar montagem</a>
          </Link>
        </div>
      </main>
    </>
  )
}