import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useComputer } from '../../hooks/useComputer';
import { useState } from 'react';

export function Header() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter();
  const path = router.asPath

  const { setup } = useComputer()

  const pathRegExp = new RegExp(/montagem\/*/);

  if (path.search(pathRegExp) !== -1) {
    return (
      <header className={styles.header}>
        <button
          className={`hamburger hamburger--collapse ${isVisible && 'is-active'}`}
          onClick={e => setIsVisible(!isVisible)}
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        <nav className={isVisible ? styles.visible : ''}>
          <li>
            <Link href={'/montagem/processador'}>
              <a className={path === '/montagem/processador' ? styles.currentComponent : (setup.cpu && styles.choosed)}>
                Processador
              </a>
            </Link>
          </li>
          <li>
            <Link href={setup.cpu ? '/montagem/placamae' : ''}>
              <a className={path === '/montagem/placamae' ? styles.currentComponent : (setup.motherboard && styles.choosed)}>
                Placa mãe
              </a>
            </Link>
          </li>
          <li>
            <Link href={setup.cpu && setup.motherboard ? '/montagem/cooler' : ''}>
              <a className={path === '/montagem/cooler' ? styles.currentComponent : (setup.waterCooler && styles.choosed)}>
                Cooler
              </a>
            </Link>
          </li>
          <li>
            <Link href={setup.cpu && setup.motherboard ? '/montagem/memoriaram' : ''}>
              <a className={path === '/montagem/memoriaram' ? styles.currentComponent : (setup.ramMemory && styles.choosed)}>
                Memória RAM
              </a>
            </Link>
          </li>
          <li>
            <Link href={setup.cpu && setup.ramMemory && setup.motherboard ? '/montagem/placadevideo' : ''}>
              <a className={path === '/montagem/placadevideo' ? styles.currentComponent : (setup.graphicCard && styles.choosed)}>
                Placa de Vídeo
              </a>
            </Link>
          </li>
          <li>
            <Link href={setup.cpu && setup.ramMemory && setup.motherboard && setup.graphicCard ? '/montagem/harddisk' : ''}>
              <a className={path === '/montagem/harddisk' ? styles.currentComponent : (setup.hardDisk && styles.choosed)}>
                Hard Disk
              </a>
            </Link>
          </li>
          <li>
            <Link href={setup.cpu && setup.ramMemory && setup.motherboard && setup.graphicCard ? '/montagem/ssd' : ''}>
              <a className={path === '/montagem/ssd' ? styles.currentComponent : (setup.SSD && styles.choosed)}>
                SSD
              </a>
            </Link>
          </li>
          <li>
            <Link href={setup.cpu && setup.ramMemory && setup.motherboard && setup.graphicCard ? '/montagem/fonte' : ''}>
              <a className={path === '/montagem/fonte' ? styles.currentComponent : (setup.powerSupply && styles.choosed)}>
                Fonte
              </a>
            </Link>
          </li>
          <li>
            <Link href={setup.cpu && setup.ramMemory && setup.motherboard && setup.graphicCard && setup.powerSupply ? '/montagem/gabinete' : ''}>
              <a className={path === '/montagem/gabinete' ? styles.currentComponent : (setup.pcCabinet && styles.choosed)}>
                Gabinete
              </a>
            </Link>
          </li>
          <li>
            <Link href={setup.cpu && setup.ramMemory && setup.motherboard && setup.graphicCard && setup.powerSupply && setup.pcCabinet ? '/montagem/fan' : ''}>
              <a className={path === '/montagem/fan' ? styles.currentComponent : (setup.pcCabinet && styles.choosed)}>
                Fan
              </a>
            </Link>
          </li>
          <li>
            <Link href={setup.cpu && setup.ramMemory && setup.motherboard && setup.graphicCard && setup.powerSupply && setup.fan && setup.pcCabinet ? '/montagem/monitor' : ''}>
              <a className={path === '/montagem/monitor' ? styles.currentComponent : (setup.monitor && styles.choosed)}>
                Monitor
              </a>
            </Link>
          </li>
        </nav>

      </header>
    )
  }

  return (
    <header className={styles.header}>
      <Link href="/" passHref>
        <Image src="/logo.svg" alt="Gamerzone" width="265px" height="54px" />
      </Link>
      {path.search(/dashboard\/*/) !== -1 || path === '/auth' ? (
        <></>
      ) : (
        <a href="https://www.konectados.com.br/" target="_blank" rel="noreferrer" className={styles.headerButton}>Visite nossa loja</a>
      )}

      {
        (path === '/dashboard' || path === '/dashboard#feedbacks') && (
          <div>
            <a href="#feedbacks">Feedbacks</a>
            <Link href='/dashboard/estoque'>
              <a style={{marginLeft: '2rem'}}>Atualizar estoque</a>
            </Link>
          </div>
        )
      }
      {
        path === '/dashboard/estoque' && (
          <div>
            <Link href='/dashboard'>
              <a>Dashboard</a>
            </Link>
          </div>
        )
      }
    </header>
  );
}