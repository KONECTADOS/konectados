import { ref, set, get} from '@firebase/database';
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { database, firestore } from '../../services/firebase';
import styles from '../../styles/estoque.module.scss';
import parseCSV from '../../utils/parseCSV';
import { useComputer } from '../../hooks/useComputer';
import { cleanStockData, divideProductsByCategory, removeUselessProducts, Estoque as EstoqueProps } from '../../utils/filterStockCsvFile';
import { NumberOfComponents } from '../../components/NumberOfComponents';
import router from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function Estoque({admin}) {
  const [csvFiles, setCsvFiles] = useState<FileList>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfProducts, setNumberOfProducts] = useState(null);

  const [estoqueData, setEstoqueData] = useState<EstoqueProps>({} as EstoqueProps);
  const { user } = useAuth();
  
  useEffect(() => {
    if(user && user?.id && (user?.email !== admin.email || user?.id !== admin.id)){
      router.push('/auth')
    }

    async function fetchEstoqueInfo(){
      const snapshot = await get(ref(database, 'estoque/info'))
      const data = snapshot.val();
      setNumberOfProducts(data)      
    }

    fetchEstoqueInfo().then(() => console.log('Finalizado'));
  }, [user, admin])

  async function saveStock(e) {
    e.preventDefault()
    setIsLoading(true)
    // if (!estoqueData[0]) return
    const now = new Date()
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`

    let files = []
    for (let i = 0; i < csvFiles.length; i++) {
      files.push({
        name: csvFiles[i].name,
        size: csvFiles[i].size,
      })
    }

    try {
      const promiseStockData = setDoc(doc(firestore, "estoque", "atual"), {
        estoque: estoqueData,
        criadoEm: date,
      });
      const promiseStockInfo = set(ref(database, "estoque/info"), {
        numeroDeProdutos: {
          cpus: estoqueData.cpus.length,
          motherboards: estoqueData.motherboards.length,
          coolers: estoqueData.coolers.length,
          ramMemories: estoqueData.ramMemories.length,
          graphicCards: estoqueData.graphicCards.length,
          hardDisks: estoqueData.hardDisks.length,
          SSDs: estoqueData.SSDs.length,
          powerSupplies: estoqueData.powerSupplies.length,
          pcCabinets: estoqueData.pcCabinets.length,
          monitors: estoqueData.monitors.length,
          fans: estoqueData.fans.length,
        }
      });
  
      toast.promise(promiseStockData, {
        loading: 'Salvando estoque...',
        error: () => {
          setIsLoading(false)
          return 'Erro ao salvar estoque, tente reacarregar a página e enviar novamente.'
        } ,
        success: () => {
          toast.promise(promiseStockInfo, {
            loading: 'Salvando informações adicionais...',
            error: () => {
              setIsLoading(false)
              return 'Erro ao salvar informações adicionais, tente reacarregar a página e enviar novamente.'
            } ,
            success: () => {
              setIsLoading(false)
              return 'Informações adicionais salvo!'
            }
          });
          router.push('/dashboard')
          return 'Estoque salvo!'
        }
      });
      
      
    } catch (error) {
      setIsLoading(false)
      
    }

    // fetchEstoque()
  }

  async function handleChangeFile(e) {
    setIsLoading(true)
    const { files } = e.target;
    if (!files[0]) return


    let filesData = []

    for await (const file of files) {
      var reader = new FileReader();
      reader.onload = async function (event) {
        const newEstoqueFile: any = parseCSV(String(event.target.result), { parseJSON: true });
        const fileData = await removeUselessProducts(newEstoqueFile,
          [
            'SUPORTE', 'CABO', 'ADAPTADOR', 'WEB CAM', 'NOTEBOOK',
            'MICROFONE', 'MOUSE', 'PC GAMER', 'NOBREAK', 'NO-BREAK',
            'PASTA', 'PEN DRIVE', 'ROTEADOR', 'SPLITTER', 'SUBWOOFER',
            'SWITCH', 'TAXA', 'TECLADO', 'MONTAGEM', 'PLACA PCI', 'PLACA NUC', 'PLUG',
            'BATERIA', 'FONE DE OUVIDO', 'ESTABILIZADOR', 'BOBINA', 'CADEIRA', 'CAIXA DE SOM',
            'CARTÃO', 'CONTROLADORA', 'DOCK STATION', 'FITA LED', 'FITA DE LED', 'GAVETA', 'FILTRO',
            'ONU GPON', 'PLACA SERIAL', 'SOFTWARE'
          ]
        )
        filesData.push(fileData)

        if (filesData.length === files.length) {
          const stock = Object.keys(filesData).reduce((ac, el) => {
            return [...ac, ...filesData[el]]
          }, []);
          const stockData = await divideProductsByCategory(stock);
          const resumedData = await cleanStockData(stockData)
          
          setCsvFiles(files)
          setEstoqueData(resumedData)
          setIsLoading(false)
        }
      };
      reader.readAsText(file);
    }
  }

  return (
    <main className={styles.container}>
      <Toaster />
      <section className={styles.content}>
        <h2>Atualizar estoque</h2>
        <div className={styles.currentStock}>
          {numberOfProducts?.numeroDeProdutos && (
            <NumberOfComponents components={numberOfProducts.numeroDeProdutos}/>
          )}
        </div>

        <form action="">
          <input type="file" accept=".csv" multiple name="csvFile" onChange={handleChangeFile} id="csvFile" disabled={isLoading}/>
          <label htmlFor="csvFile" className={csvFiles ? styles.choosed : ''}>
            {!csvFiles ? (
              <>
                <Image width="36px" height="36px" src="/icons/plus.svg" alt="Adicionar arquivo" />
                <span style={{ marginLeft: '1rem', }}>Importar arquivo CSV de estoque</span>
              </>
            ) : (
              <Image width="36px" height="36px" src="/icons/file.svg" alt="Arquivo" />
            )}
          </label>

          <button onClick={saveStock} className={styles.saveStockButton} disabled={isLoading || csvFiles === null}>Salvar</button>
          
          {csvFiles && Array.from(csvFiles).map((csvFile) => {
            return (
              <div key={csvFile.name} className={styles.fileUploaded}>
                <Image width="32px" height="32px" src="/icons/file.svg" alt="Arquivo" />
                <p>Arquivo: {csvFile.name}</p>
                <p>Tamanho: {Math.round(csvFile.size / 1024)} KB</p>
              </div>
            )
          })}

        </form>
      </section>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { konectados } = parseCookies(ctx)

  const admin = JSON.parse(konectados)
  
  if(!admin || !admin.email || !admin.id) {
    return {
      redirect:{
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return {
    props: {
      admin,
    }
  }
}