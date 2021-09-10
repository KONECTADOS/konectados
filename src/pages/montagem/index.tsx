import Link from 'next/link';
import { useComputer } from '../../hooks/useComputer';
import styles from '../../styles/montagem.module.scss';

export default function Montagem() {
  const { currentComponent } = useComputer();

  return (
    <main className={styles.container}>
      <section className={styles.contentHelp}>

        <h2>Como funciona a <br/> montagem do <span>PC?</span></h2>
        <p>Você escolherá pelo menos 6 componentes, e ao final, será apresentado
          o valor estimado do seu setup. Não se preocupe, você não irá precisar fazer cadastro ou pagar alguma taxa, nossa plataforma é <span>Gratuita. </span>
          Aqui você irá encontrar:</p>
        
        <ol>
          <li>Processador </li>
          <li>Placa mãe </li>
          <li>Water Cooler <span>(Opcional)</span></li>
          <li>Memória RAM </li>
          <li>Placa de vídeo </li>
          <li>HardDisk - HD <span>(Opcional)</span></li>
          <li>SSD <span>(Opcional)</span></li>
          <li>Fonte </li>
          <li>Gabinete</li>
          <li>Monitor <span>(Opcional)</span></li>
        </ol>
        <Link href="/montagem/processador">
          <a>Iniciar montagem</a>
        </Link>
      </section>
    </main>
  )
}