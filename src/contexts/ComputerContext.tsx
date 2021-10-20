import { get, ref } from "@firebase/database";
import { setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import { database } from "../services/firebase";

interface PcComponent {
  description: string;
  price: number;
  images: string[],
  aditionalDescription?: string;
  amountInStock: number;
  amount?: number;
  ListOfComponents?: any[]
}

interface CPU extends PcComponent {
  // maxRamFrequencyInMhz: number;
  // maxRamSizeInGb: number;
  cpuGenCompatibility: string[]
  cpuSocket: string;
}

interface Motherboard extends PcComponent {
  cpuSocket: string;
  ramSocket: string;
  isCompatibleWithMTwo?: boolean
}

interface WaterCooler extends PcComponent {
  socketCompatibility: string[];
}
interface RamMemory extends PcComponent {
  ramSocket: string;
  frequencyInMhz: number;
  ramSizeInGb: number;
}

interface GraphicCard extends PcComponent {
  graphicCardSizeInCm?: number;
  vRamSizeInGb: number;
}

interface PcCabinet extends PcComponent {
  cabinetSizeInCm: number;
}

interface HardDisk extends PcComponent {
  sizeInGb: number;
  isMTwo?: boolean;
}

interface PowerSupply extends PcComponent {
  powerInWatts: number;
}

type CurrentComponent = 'Processador' | 'Placa mãe' | 'Water Cooler' | 'Memória RAM'
  | 'Placa de vídeo' | 'Hard Disk' | 'SSD' | 'Fonte' | 'Gabinete' | 'Monitor';


interface UserSetup {
  cpu: CPU;
  motherboard: Motherboard;
  waterCooler: WaterCooler;
  ramMemory: RamMemory;
  graphicCard: GraphicCard;
  hardDisk: HardDisk;
  SSD: HardDisk;
  powerSupply: PowerSupply;
  pcCabinet: PcCabinet;
  monitor: PcComponent;
  fan: PcComponent;
  link?: string;
}

interface Estoque {
  criadoEm: string;
  data: any[];
  files: [{
    name: string;
    size: number;
  }]
}

interface ComputerContextProps {
  currentComponentAmount: number;
  setup: UserSetup;
  setupPrice: number;
  estoque: Estoque;
  fetchEstoque: () => Promise<void>;
  clearSetup: () => void;
  setEstoque: (estoque: Estoque) => void;
  setSetupLink: (link: string) => void;
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

export function ComputerContextProvider({ children }) {
  const [currentComponentAmount, setCurrentComponentAmount] = useState(1)
  const [setup, setSetup] = useState<UserSetup>({} as UserSetup)
  const [setupPrice, setSetupPrice] = useState(0);
  const [estoque, setEstoque] = useState<Estoque>({} as Estoque);

  useEffect(() => {
    const savedSetup = JSON.parse(localStorage.getItem('konecta@setup'))
    if (!savedSetup) return
    let currentSetupPrice: number = 0

    for (const key in savedSetup) {
      if (Object.prototype.hasOwnProperty.call(savedSetup, key)) {
        currentSetupPrice += savedSetup[key].price;
      }
    }

    fetchEstoque()
    setSetupPrice(currentSetupPrice)
    setSetup(savedSetup);
  }, [])

  async function fetchEstoque() {
    const data = await get(ref(database, 'estoque'))
    const stock = data.val()
    setCookie(null, 'konectados@stock', stock)
    setEstoque(stock);
  }

  function clearSetup() {
    setSetup({} as UserSetup)
  }

  function setSetupLink(link) {
    const newSetup = { ...setup };
    newSetup.link = link
    setSetup(newSetup)
  }

  function changeCurrentComponentAmount(componentAmount: string | number) {
    setCurrentComponentAmount(Number(componentAmount))
  }

  function insertComponentIntoSetup(
    componentName: CurrentComponent,
    product: PcComponent | PcCabinet | GraphicCard | RamMemory | Motherboard | CPU
  ) {
    const newSetup = { ...setup };
    newSetup[componentName] = { ...product }
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

  function changeComponentIntoSetup(
    componentName: CurrentComponent,
    product: PcComponent | PcCabinet | GraphicCard | RamMemory | Motherboard | CPU
  ) {
    const newSetup = { ...setup };
    newSetup[componentName] = product;
    let currentSetupPrice: number = 0

    for (const key in newSetup) {
      if (Object.prototype.hasOwnProperty.call(newSetup, key)) {
        currentSetupPrice += newSetup[key].price;
      }
    }
    setSetupPrice(currentSetupPrice)
    localStorage.setItem('konecta@setup', JSON.stringify(newSetup))

    setSetup(newSetup);
  }

  function removeComponentIntoSetup(
    componentName: CurrentComponent
  ) {
    const newSetup = { ...setup };
    newSetup[componentName] = {};
    let currentSetupPrice: number = 0

    for (const key in newSetup) {
      if (Object.prototype.hasOwnProperty.call(newSetup, key)) {
        currentSetupPrice += newSetup[key].price;
      }
    }

    setSetupPrice(currentSetupPrice)
    localStorage.setItem('konecta@setup', JSON.stringify(newSetup))

    setSetup(newSetup);
  }

  function skipComponent(componentName: string) {
    const newSetup = { ...setup };
    newSetup[componentName] = { description: "skipped", price: 0 }
    let currentSetupPrice: number = 0

    for (const key in newSetup) {
      if (Object.prototype.hasOwnProperty.call(newSetup, key)) {
        currentSetupPrice += newSetup[key].price;
      }
    }

    setSetupPrice(currentSetupPrice)
    localStorage.setItem('konecta@setup', JSON.stringify(newSetup))
    setSetup(newSetup)
  }

  return (
    <ComputerContext.Provider value={{
      currentComponentAmount,
      setup,
      setupPrice,
      estoque,
      setEstoque,
      clearSetup,
      fetchEstoque,
      setSetupLink,
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