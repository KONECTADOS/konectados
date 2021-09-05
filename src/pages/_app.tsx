import { Header } from '../components/Header'
import { ComputerContextProvider } from '../contexts/ComputerContext'
import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <ComputerContextProvider>
      <Header />
      <Component {...pageProps} />
    </ComputerContextProvider>
  )
}

export default MyApp
