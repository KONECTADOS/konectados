// import { ref, set } from '@firebase/database';
import { doc, setDoc } from "firebase/firestore";
import { useState } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { firestore } from '../../services/firebase';
import styles from '../../styles/estoque.module.scss';
import parseCSV from '../../utils/parseCSV';
import { useComputer } from '../../hooks/useComputer';
import { cleanStockData, divideProductsByCategory, removeUselessProducts, Estoque as EstoqueProps } from '../../utils/filterStockCsvFile';

export default function Estoque() {
  const [csvFiles, setCsvFiles] = useState<FileList>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [estoqueData, setEstoqueData] = useState<EstoqueProps>({} as EstoqueProps);
  const { estoque } = useComputer();

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

    // console.log(estoqueData, date)

    try {
      const promise = setDoc(doc(firestore, "estoque", "atual"), {
        estoque: estoqueData,
        criadoEm: date,
      });
  
      toast.promise(promise, {
        loading: 'Salvando estoque...',
        error: () => {
          setIsLoading(false)
          return 'Erro ao salvar estoque, tente reacarregar a página e enviar novamente.'
        } ,
        success: () => {
          setIsLoading(false)
          return 'Estoque salvo!'
        }
      });
      
    } catch (error) {
      console.log(error.message)
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

        // console.log(stockData, 'data')
        filesData.push(fileData)

        // let a = Object.keys(filesData).reduce((ac, el) => {
        //   return [...ac, ...filesData[el]]
        // }, []);


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
          {estoque.files?.map((csvFile) => {
            return (
              <div key={csvFile.name}>
                <p>Arquivo: {csvFile.name}</p>
                <p>Tamanho: {Math.round(csvFile.size / 1024)} KB</p>
              </div>
            )
          })}
        </div>

        <form action="">
          <input type="file" accept=".csv" multiple name="csvFile" onChange={handleChangeFile} id="csvFile" />
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
          {csvFiles && Array.from(csvFiles).map((csvFile) => {
            return (
              <div key={csvFile.name}>
                <p>Arquivo: {csvFile.name}</p>
                <p>Tamanho: {Math.round(csvFile.size / 1024)} KB</p>
              </div>
            )
          })}

          <button onClick={saveStock} disabled={isLoading}>Salvar</button>
        </form>
      </section>
    </main>
  )
}