import styles from './styles.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function SideNavigation() {
  const router = useRouter()

  if (!router.asPath.includes('/montagem/')) return (<></>)

  if(router.asPath === '/montagem/resultado'){
    return null
  }

  return (
    <div className={styles.sideNavigationContainer}>
      <Link href={router.asPath !== '/montagem/processador' ? '/montagem/processador' : ''}>
        <a className={router.asPath === '/montagem/processador' ? styles.active : ''}></a>
      </Link>
      <Link href={router.asPath !== '/montagem/placamae' ? '/montagem/placamae' : ''}>
        <a className={router.asPath === '/montagem/placamae' ? styles.active : ''}></a>
      </Link>
      <Link href={router.asPath !== '/montagem/watercooler' ? '/montagem/watercooler' : ''}>
        <a className={router.asPath === '/montagem/watercooler' ? styles.active : ''}></a>
      </Link>
      <Link href={router.asPath !== '/montagem/memoriaram' ? '/montagem/memoriaram' : ''}>
        <a className={router.asPath === '/montagem/memoriaram' ? styles.active : ''}></a>
      </Link>
      <Link href={router.asPath !== '/montagem/placadevideo' ? '/montagem/placadevideo' : ''}>
        <a className={router.asPath === '/montagem/placadevideo' ? styles.active : ''}></a>
      </Link>
      <Link href={router.asPath !== '/montagem/harddisk' ? '/montagem/harddisk' : ''}>
        <a className={router.asPath === '/montagem/harddisk' ? styles.active : ''}></a>
      </Link>
      <Link href={router.asPath !== '/montagem/ssd' ? '/montagem/ssd' : ''}>
        <a className={router.asPath === '/montagem/ssd' ? styles.active : ''}></a>
      </Link>
      <Link href={router.asPath !== '/montagem/fonte' ? '/montagem/fonte' : ''}>
        <a className={router.asPath === '/montagem/fonte' ? styles.active : ''}></a>
      </Link>
      <Link href={router.asPath !== '/montagem/gabinete' ? '/montagem/gabinete' : ''}>
        <a className={router.asPath === '/montagem/gabinete' ? styles.active : ''}></a>
      </Link>
      <Link href={router.asPath !== '/montagem/monitor' ? '/montagem/monitor' : ''}>
        <a className={router.asPath === '/montagem/monitor' ? styles.active : ''}></a>
      </Link>
    </div>
  )
}