import { Header } from '../components/Header'
import { SideNavigation } from '../components/SideNavigation'
import { ComputerContextProvider } from '../contexts/ComputerContext'
import NProgress from 'nprogress';
import Router from 'next/router';

import '../styles/global.scss'
import { AuthContextProvider } from '../contexts/AuthContext';
import { EditComponentContextProvider } from '../contexts/EditComponentContext';

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
    <AuthContextProvider>
      <ComputerContextProvider>
        <EditComponentContextProvider>
          <Header />
          <Component {...pageProps} />
          <SideNavigation />
        </EditComponentContextProvider>
      </ComputerContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
