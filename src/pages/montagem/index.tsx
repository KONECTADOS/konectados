import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../../styles/montagem.module.scss';
import Head from 'next/head';
import Image from 'next/image';

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

        <section className={styles.componentExample}>
          <span className={styles.imageHelp}>Ao passar o mouse na imagem você vê uma outra foto do produto</span>
          <span className={styles.selectHelp}>Aqui você seleciona o componente e avança para o próximo</span>
          <span className={styles.productHelp}>Clicando em cima do produto, abrirá uma janelinha com sua descrição detalhada e especificações</span>

          <svg width="110" height="102" className={styles.image} viewBox="0 0 110 102" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M108 3C108.828 3 109.5 2.32843 109.5 1.5C109.5 0.671574 108.828 4.5871e-07 108 1.21213e-08L108 3ZM8.81911 100.926C9.32994 101.578 10.2727 101.693 10.9249 101.182L21.5529 92.8578C22.2051 92.347 22.3197 91.4041 21.8089 90.752C21.298 90.0998 20.3552 89.9852 19.7031 90.496L10.256 97.8955L2.85647 88.4484C2.34565 87.7962 1.40284 87.6816 0.750651 88.1924C0.0984647 88.7033 -0.0161292 89.6461 0.494698 90.2983L8.81911 100.926ZM108 1.21213e-08C93.6339 -7.73234e-06 71.5233 2.01003 51.5936 15.5726C31.6029 29.1766 14.0519 54.2326 8.51096 99.8203L11.489 100.182C16.9481 55.2687 34.1471 31.074 53.2814 18.0527C72.4767 4.98996 93.8661 2.99999 108 3L108 1.21213e-08Z" fill="white" />
          </svg>

          <svg width="108" height="131" className={styles.select} viewBox="0 0 108 131" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.00001 3.5C1.17158 3.5 0.500008 2.82843 0.500008 2C0.500008 1.17157 1.17158 0.5 2.00001 0.5L2.00001 3.5ZM99.1849 129.92C98.6769 130.574 97.7347 130.693 97.0802 130.185L86.416 121.907C85.7615 121.399 85.6428 120.457 86.1508 119.802C86.6588 119.148 87.6011 119.029 88.2555 119.537L97.7348 126.895L105.093 117.416C105.601 116.762 106.543 116.643 107.198 117.151C107.852 117.659 107.971 118.601 107.463 119.255L99.1849 129.92ZM2.00001 0.5C12.7971 0.5 33.2693 0.48514 53.015 16.7162C72.7427 32.9325 91.4639 65.1191 99.4882 128.812L96.5118 129.187C88.5361 65.8809 70.0073 34.5675 51.11 19.0338C32.2307 3.51486 12.7029 3.5 2.00001 3.5L2.00001 0.5Z" fill="white" />
          </svg>

          <svg width="129" height="128" className={styles.product} viewBox="0 0 129 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M127 124.5C127.828 124.5 128.5 125.172 128.5 126C128.5 126.828 127.828 127.5 127 127.5L127 124.5ZM8.82486 1.06778C9.33971 0.418765 10.2832 0.310008 10.9322 0.824861L21.5085 9.21488C22.1575 9.72973 22.2663 10.6732 21.7514 11.3222C21.2366 11.9713 20.2931 12.08 19.644 11.5652L10.2429 4.10737L2.78512 13.5085C2.27027 14.1575 1.32677 14.2663 0.677755 13.7514C0.0287424 13.2366 -0.0800152 12.2931 0.434838 11.6441L8.82486 1.06778ZM127 127.5C109.861 127.5 83.5194 124.969 59.7907 107.942C36.0124 90.8797 15.1122 59.4484 8.50987 2.17177L11.4901 1.82823C18.0205 58.4807 38.6075 89.0494 61.5397 105.505C84.5214 121.996 110.114 124.5 127 124.5L127 127.5Z" fill="white" />
          </svg>

          <svg width="24" height="103" className={styles.arrowS} viewBox="0 0 24 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0607 0.973031C12.4749 0.387245 11.5251 0.387245 10.9393 0.973031L1.3934 10.519C0.807612 11.1048 0.807612 12.0545 1.3934 12.6403C1.97918 13.2261 2.92893 13.2261 3.51472 12.6403L12 4.15501L20.4853 12.6403C21.0711 13.2261 22.0208 13.2261 22.6066 12.6403C23.1924 12.0545 23.1924 11.1048 22.6066 10.519L13.0607 0.973031ZM13.5 102.034L13.5 2.03369H10.5L10.5 102.034H13.5Z" fill="white" />
          </svg>
          <svg width="24" height="103" className={styles.arrowI} viewBox="0 0 24 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0607 0.973031C12.4749 0.387245 11.5251 0.387245 10.9393 0.973031L1.3934 10.519C0.807612 11.1048 0.807612 12.0545 1.3934 12.6403C1.97918 13.2261 2.92893 13.2261 3.51472 12.6403L12 4.15501L20.4853 12.6403C21.0711 13.2261 22.0208 13.2261 22.6066 12.6403C23.1924 12.0545 23.1924 11.1048 22.6066 10.519L13.0607 0.973031ZM13.5 102.034L13.5 2.03369H10.5L10.5 102.034H13.5Z" fill="white" />
          </svg>


          <div className={styles.wrapper}>
            <div className={styles.imageWrapper}>
              <Image width="100px" height="100px" src="/icons/cpu.svg" alt="Processador" />
            </div>
            <p>Processador Intel Core i5-10400, Cache 12MB, 2.9GHz (4.3GHz Max Turbo), LGA 1200</p>
            <p>LGA1200</p>
            <p>R$1200,00</p>
            <button>Selecionar</button>
          </div>
        </section>
        
        <div className={styles.start}>
          <Link href="/montagem/processador">
            <a>Iniciar montagem</a>
          </Link>
        </div>
      </main>
    </>
  )
}