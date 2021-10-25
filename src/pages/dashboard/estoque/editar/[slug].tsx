import { getDoc, doc } from "@firebase/firestore";
import { GetServerSideProps } from "next";
// import { useRouter } from "next/router";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast"
import { EditProductTable } from "../../../../components/EditProductTable";
import { useComponent } from "../../../../hooks/useComponent";
import { firestore } from "../../../../services/firebase";
import styles from './styles.module.scss';

export default function Component({ components, estoque, componentName }) {
  const { setList, saveList, setEstoque, setCurrentComponent } = useComponent()
  // const router = useRouter();

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

    // router.push('/dashboard/estoque')
  }

  return (
    <main className={styles.container}>
      <Toaster />
      <section className={styles.content}>
        <ComponentName name={componentName}/>

        <EditProductTable components={components} />
      </section>

      <div className={styles.saveNewComponents}>
        <button onClick={handleSaveComponents}>Salvar alterações</button>
      </div>
    </main>
  )
}

function ComponentName({name}: {name: string}) {
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
    <h2>Atualizar { componentName}</h2>
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
