/* eslint-disable react-hooks/exhaustive-deps */
import { getDoc, doc } from "@firebase/firestore";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"
import { EditProductTable } from "../../../../components/EditProductTable";
import { useComponent } from "../../../../hooks/useComponent";
import { database, firestore } from "../../../../services/firebase";
import styles from './styles.module.scss';

export default function Component({ components, estoque, componentName }) {
  const { setList, saveList, setEstoque, setCurrentComponent, list } = useComponent()
  const [percentage, setPercentage] = useState(components[0].porcentagem || 0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCurrentComponent(componentName)
    setEstoque(estoque)
    setList(components)
  }, [components, componentName, estoque])

  async function handleSaveComponents() {
    const promise = saveList()

    toast.promise(promise, {
      loading: 'Salvando alterações no banco de dados',
      success: 'Preço atualizado!',
      error: 'Erro ao salvar novo preço. Tente recarregar a página e tentar novamente.'
    })

    router.push('/dashboard/estoque')
  }

  async function handleSavePercentage() {
    setIsLoading(true)
    const newList = [...components].map((el, index) => {
      let price;
      if(percentage === 0 ){
        return {
          ...el,
          price: el.basePrice,
          porcentagem: 0,
        }
      }
      if(el.basePrice){
        price = el.basePrice + (el.basePrice * (percentage / 100));
        return {
          ...el,
          price,
          porcentagem: percentage,
        }
      } else {
        
        price = el.price + (el.price * (percentage / 100));
        console.log(price, el.price);
        return {
          ...el,
          basePrice: el.price,
          price,
          porcentagem: percentage,
        }
      } 
    });
    
    console.log(newList);
    setList(newList);
    
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <main className={styles.container}>
      <Toaster />
      <section className={styles.content}>
        <ComponentName name={componentName} />

        <section className={styles.changePrice}>
          <span>Taxas ou descontos (%)</span>
          <input
            type="number"
            value={percentage}
            onChange={e => setPercentage(Number(e.target.value))}
          />

          <button onClick={handleSavePercentage}>
            Aplicar
          </button>
        </section>

        {isLoading ? (<div className="loading" style={{position: 'absolute', left: '45%', top: '40%'}}/>) : (
          <EditProductTable components={list} />
        )}
      </section>

      <div className={styles.saveNewComponents}>
        <button onClick={handleSaveComponents}>Salvar alterações</button>
      </div>
    </main>
  )
}

function ComponentName({ name }: { name: string }) {
  let componentName: string;

  switch (name) {
    case 'cpus':
      componentName = "processadores";
      break;
    case 'motherboards':
      componentName = "placas mãe";
      break;
    case 'ramMemories':
      componentName = "memórias RMA";
      break;
    case 'graphicCards':
      componentName = "placas de vídeo";
      break;
    case 'coolers':
      componentName = "coolers";
      break;
    case 'hardDisks':
      componentName = "HDs";
      break;
    case 'SSDs':
      componentName = "SSDs";
      break;
    case 'powerSupplies':
      componentName = "fontes";
      break;
    case 'pcCabinets':
      componentName = "gabinetes";
      break;
    case 'fans':
      componentName = "fans";
      break;
    case 'monitors':
      componentName = "monitores";
      break;
  }

  return (
    <h2>Atualizar {componentName}</h2>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params;

  const docRef = doc(firestore, 'estoque', `atual`);
  const querySnapshot = await getDoc(docRef);
  const data = querySnapshot.data();
  const components = data.estoque[String(slug)]

  return {
    props: {
      components,
      estoque: data.estoque,
      componentName: slug,
    }
  }
}
