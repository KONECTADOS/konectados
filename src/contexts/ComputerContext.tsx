import { createContext, useEffect, useState } from "react";


interface PcComponent {
  name: string;
  price: number;
  amountInStock: number;
  amount?: number;
}

interface CPU extends PcComponent{
  // maxRamFrequencyInMhz: number;
  // maxRamSizeInGb: number;
  cpuSocket: string;
}

interface Motherboard extends CPU{
  ramSocket: string;
}

interface WaterCooler extends PcComponent{
  socketCompatibility: string[];
}
interface RamMemory extends PcComponent{
  ramSocket: string;
  frequencyInMhz: number;
  ramSizeInGb: number;
}

interface GraphicCard extends PcComponent{
  graphicCardSizeInCm?: number;
  vRamSizeInGb: number;
}

interface PcCabinet extends PcComponent{
  cabinetSizeInCm: number;
}

interface HardDisk extends PcComponent{
  sizeInGb: number;
}

interface PowerSupply extends PcComponent{
  powerInWatts: number;
}

type CurrentComponent = 'Processador' | 'Placa mãe' | 'Water Cooler' | 'Memória RAM' 
| 'Placa de vídeo' | 'Hard Disk' | 'SSD' | 'Fonte' | 'Gabinete' | 'Monitor';


interface UserSetup{
  cpu: CPU;
  motherboard: Motherboard;
  waterCooler: WaterCooler;
  ramMemory: RamMemory[];
  graphicCard: GraphicCard;
  hardDisk: HardDisk;
  SSD: HardDisk;
  powerSupply: PowerSupply;
  pcCabinet: PcCabinet;
  screen: PcComponent;
}

interface ComputerContextProps{
  currentComponentAmount: number;
  setup: UserSetup;
  setupPrice: number;
  changeCurrentComponentAmount: (componentAmount: string | number) => void;
  skipComponent: (componentName: CurrentComponent) => void;
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
  const [currentComponentAmount, setCurrentComponentAmount] = useState(1)
  const [setup, setSetup] = useState<UserSetup>({} as UserSetup)
  const [setupPrice, setSetupPrice] = useState(0)

  useEffect(() => {
    const savedSetup = JSON.parse(localStorage.getItem('konecta@setup'))
    if(!savedSetup) return
    let currentSetupPrice: number = 0

    for (const key in savedSetup) {
      if (Object.prototype.hasOwnProperty.call(savedSetup, key)) {
        currentSetupPrice += savedSetup[key].price;
      }
    }
    setSetupPrice(currentSetupPrice)
    setSetup(savedSetup);
  }, [])

  function changeCurrentComponentAmount (componentAmount: string | number) {
    setCurrentComponentAmount(Number(componentAmount))
  }

  function insertComponentIntoSetup (
    componentName: CurrentComponent, 
    product: PcComponent | PcCabinet | GraphicCard | RamMemory | Motherboard | CPU
  ) {
    const newSetup = {...setup};
    newSetup[componentName] = {...product}
    let currentSetupPrice: number = 0

    for (const key in newSetup) {
      if (Object.prototype.hasOwnProperty.call(newSetup, key)) {
        currentSetupPrice += newSetup[key].price;
      }
    }

    // handleChangeSetup(componentName)
    localStorage.setItem('konecta@setup', JSON.stringify(newSetup))
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
    newSetup[componentName] = {};
    let currentSetupPrice: number = 0

    for (const key in newSetup) {
      if (Object.prototype.hasOwnProperty.call(newSetup, key)) {
        currentSetupPrice += newSetup[key].price;
      }
    }

    setSetup(newSetup);
  }

  function skipComponent(componentName: string){
    const newSetup = {...setup};
    newSetup[componentName] = {name: "skipped", price: 0}
    
    localStorage.setItem('konecta@setup', JSON.stringify(newSetup))
    setSetup(newSetup)
  }

  return ( 
    <ComputerContext.Provider value={{
      currentComponentAmount,
      setup,
      setupPrice,
      insertComponentIntoSetup,
      changeComponentIntoSetup,
      removeComponentIntoSetup,
      changeCurrentComponentAmount,
      skipComponent
    } as ComputerContextProps}>
      {children}
    </ComputerContext.Provider>
  )
  
}