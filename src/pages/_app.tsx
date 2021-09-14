import { Header } from '../components/Header'
import { SideNavigation } from '../components/SideNavigation'
import { ComputerContextProvider } from '../contexts/ComputerContext'
import '../styles/global.scss'

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
