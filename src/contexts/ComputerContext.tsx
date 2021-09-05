import { createContext, useState } from "react";


interface PcComponent {
  name: string;
  price: number;
  amountInStock: number;
  amount?: number;
}

interface CPU extends PcComponent{
  maxRamSizeInMhz: number;
  maxRamSizeInGB: number;
  cpuSocket: string;
}

interface Motherboard extends CPU{
  ramSocket: string;
}

interface RamMemory extends PcComponent{
  ramSocket: string;
  frequencyInMhz: number;
  ramSizeInGb: number;
}

interface GraphicCard extends PcComponent{
  graphicCardSizeInCm: number;
}

interface PcCabinet extends PcComponent{
  cabinetSizeInCm: number;
}

type CurrentComponent = 'Processador' | 'Placa mãe' | 'Water Cooler' | 'Memória RAM' 
| 'Placa de vídeo' | 'Hard Disk' | 'SSD' | 'Fonte' | 'Gabinete' | 'Monitor';


interface UserSetup{
  cpu: CPU;
  motherboard: Motherboard;
  waterCooler: PcComponent;
  ramMemory: RamMemory;
  graphicCard: GraphicCard;
  hardDisk: PcComponent;
  SSD: PcComponent;
  powerSupply: PcComponent;
  pcCabinet: PcCabinet;
  screen: PcComponent;
}

interface ComputerContextProps{
  currentComponent: CurrentComponent;
  setup: UserSetup;
  setupPrice: number;
  changeCurrentComponent: (componentName: CurrentComponent) => void;
  insertComponentIntoSetup: (
    componentName: CurrentComponent, 
    product: PcComponent | PcCabinet | GraphicCard | RamMemory | Motherboard | CPU
    ) => void;
  changeComponentIntoSetup: (
    componentName: CurrentComponent, 
    product: PcComponent | PcCabinet | GraphicCard | RamMemory | Motherboard | CPU
    ) => void;
  removeComponentIntoSetup: (
    componentName: CurrentComponent, 
    product: PcComponent | PcCabinet | GraphicCard | RamMemory | Motherboard | CPU
    ) => void;
}

export const ComputerContext = createContext({} as ComputerContextProps)

export function ComputerContextProvider ({ children } ) {
  const [currentComponent, setCurrentComponent] = useState<CurrentComponent>('Processador')
  const [setup, setSetup] = useState<UserSetup>({} as UserSetup)
  const [setupPrice, setSetupPrice] = useState(0)

  function changeCurrentComponent (componentName: CurrentComponent) {
    setCurrentComponent(componentName)
  }

  function insertComponentIntoSetup (
    componentName: CurrentComponent, 
    product: PcComponent | PcCabinet | GraphicCard | RamMemory | Motherboard | CPU
  ) {
    const newSetup = {...setup};
    newSetup[componentName] = product
    let currentSetupPrice: number = 0

    for (const key in newSetup) {
      if (Object.prototype.hasOwnProperty.call(newSetup, key)) {
        currentSetupPrice += newSetup[key].price;
      }
    }
    setSetupPrice(currentSetupPrice)
    setSetup(newSetup)
  }
  
  function changeComponentIntoSetup (
    componentName: CurrentComponent, 
    product: PcComponent | PcCabinet | GraphicCard | RamMemory | Motherboard | CPU
  ) {
    const newSetup = {...setup};
    newSetup[componentName] = product;
    let currentSetupPrice: number = 0

    for (const key in newSetup) {
      if (Object.prototype.hasOwnProperty.call(newSetup, key)) {
        currentSetupPrice += newSetup[key].price;
      }
    }
    setSetupPrice(currentSetupPrice)

    setSetup(newSetup);
  }

  function removeComponentIntoSetup (
    componentName: CurrentComponent
  ) {
    const newSetup = {...setup};
    newSetup[componentName] = null;
    let currentSetupPrice: number = 0

    for (const key in newSetup) {
      if (Object.prototype.hasOwnProperty.call(newSetup, key)) {
        currentSetupPrice += newSetup[key].price;
      }
    }

    setSetup(newSetup);
  }

  return ( 
    <ComputerContext.Provider value={{
      currentComponent,
      setup,
      setupPrice,
      insertComponentIntoSetup,
      changeComponentIntoSetup,
      removeComponentIntoSetup,
      changeCurrentComponent,
    } as ComputerContextProps}>
      {children}
    </ComputerContext.Provider>
  )
  
}