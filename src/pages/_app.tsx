import { Header } from '../components/Header'
import { SideNavigation } from '../components/SideNavigation'
import { ComputerContextProvider } from '../contexts/ComputerContext'
import NProgress from 'nprogress';
import Router from 'next/router';

import '../styles/global.scss'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})
Router.events.on('routeChangeError', () => {
  NProgress.done()
})

function MyApp({ Component, pageProps }) {
  return (
    <ComputerContextProvider>
      <Header />
      <Component {...pageProps} />
      <SideNavigation />
    </ComputerContextProvider>
  )
}

export default MyApp
