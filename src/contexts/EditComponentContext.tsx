import { doc, setDoc } from '@firebase/firestore';
import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { firestore } from '../services/firebase';

type EditComponentContextType = {
  currentComponent: string,
  list: any[];
  setComponentIntoList: (component: any) => void;
  saveList: () => Promise<void>;
  updateStock: () => void;
  setList: Dispatch<SetStateAction<any[]>>;
  setEstoque: Dispatch<SetStateAction<any>>;
  setCurrentComponent: Dispatch<SetStateAction<string>>;
}

type EditComponentContextProps = {
  children: ReactNode;
}

export const EditComponentContext = createContext({} as EditComponentContextType)

export function EditComponentContextProvider({ children }: EditComponentContextProps) {
  const [currentComponent, setCurrentComponent] = useState('')
  const [list, setList] = useState([])
  const [estoque, setEstoque] = useState({} as any)

  // useEffect(() => {
    
  // }, []);

  function setComponentIntoList(component: any) {
    const newList = [...list];
    let newEstoque = {...estoque};

    const changedComponent = newList.map(el => el.skuCode === component.skuCode ? component : el);
    newEstoque[currentComponent] = changedComponent
    
    setList(changedComponent)
    setEstoque(newEstoque)
  }

  function updateStock(){
    const newEstoque = {...estoque};
    newEstoque[currentComponent] = list

    setEstoque(newEstoque)
  }

  async function saveList () {
    const newEstoque = {...estoque};
    newEstoque[currentComponent] = list

    const now = new Date()
    await setDoc(doc(firestore, 'estoque', 'atual'), {estoque: newEstoque, criadoEm: now});
  }
 
  return (
    <EditComponentContext.Provider value={{ currentComponent, list, updateStock, setComponentIntoList, saveList, setList, setEstoque, setCurrentComponent }}>
      {children}
    </EditComponentContext.Provider>
  )
}
