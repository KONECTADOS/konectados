import { doc, getDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { firestore } from "./firebase";

export async function fetchStock(component: string,changeStateFunction: Dispatch<SetStateAction<any[]>>) {
  const docRef = doc(firestore, 'estoque', 'atual');

  const querySnapshot = await getDoc(docRef);
  
  const docData = querySnapshot.data()
  localStorage.setItem('Konectados@stockCache', JSON.stringify(docData.estoque));

  switch(component) {
    case 'cpus':
      changeStateFunction(docData.estoque.cpus);
      return;
    case 'motherboards':
      changeStateFunction(docData.estoque.motherboards);
      return;
    case 'coolers':
      changeStateFunction(docData.estoque.coolers);
      return;
    case 'ramMemories':
      changeStateFunction(docData.estoque.ramMemories);
      return;
    case 'graphicCards':
      changeStateFunction(docData.estoque.graphicCards);
      return;
    case 'hardDisks':
      changeStateFunction(docData.estoque.hardDisks);
      return;
    case 'SSDs':
      changeStateFunction(docData.estoque.SSDs);
      return;
    case 'powerSupplies':
      changeStateFunction(docData.estoque.powerSupplies);
      return;
    case 'pcCabinets':
      changeStateFunction(docData.estoque.pcCabinets);
      return;
    case 'fans':
      changeStateFunction(docData.estoque.fans);
      return;
    case 'monitors':
      changeStateFunction(docData.estoque.monitors);
      return;

  }
}