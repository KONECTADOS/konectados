import { getRAMSocketCompatibility } from "./getRAMSocketCompatibility";
import { getSocketCompatibility } from "./getSocketCompatibility";
import { getRamFrequencyInMhz } from "./getRAMFrequencyInMhz";
import { getSizeInGb } from "./getSizeInGb";
import { getPowerInWatts } from "./getPowerInWatts";
import { getCPUGenCompatibility } from "./getCPUGenCompatibility";
import { getMotherboardSocketGen } from "./getMotherboardSocketGen";

interface STOCK {
  cpus: any[];
  motherboards: any[];
  coolers: any[];
  ramMemories: any[];
  graphicCards: any[];
  hardDisks: any[];
  SSDs: any[];
  powerSupplies: any[];
  pcCabinets: any[];
  monitors: any[];
  fans: any[];
}

interface CLEANED_STOCK {
  description: string;
  aditionalDescription: string;
  price: number;
  skuCode: number;
  images: string[];
  stock: number;
}

interface CPU extends CLEANED_STOCK {
  cpuSocket: string;
  cpuGenCompatibility?: string[]
}
interface Motherboard {
  cpuSocket: string;
  ramSocket: string;
  cpuSocketGen: string;
  isCompatibleWithMTwo: boolean;
}
interface COOLER extends CLEANED_STOCK {
  socketCompatibility: string[];
}
interface RamMemory extends CLEANED_STOCK {
  ramSocket: string;
  frequencyInMhz: number;
  ramSizeInGb: number;
}
interface GraphicCard extends CLEANED_STOCK {
  sizeInGb: number;
}
interface Storage extends CLEANED_STOCK {
  sizeInGb: number;
  isMTwo?: boolean;
}
interface PowerSupply extends CLEANED_STOCK {
  powerInWatts: number;
}

export interface Estoque {
  cpus: CPU[];
  motherboards: Motherboard[];
  coolers: COOLER[];
  ramMemories: RamMemory[];
  graphicCards: GraphicCard[];
  hardDisks: Storage[];
  SSDs: Storage[];
  powerSupplies: PowerSupply[];
  pcCabinets: CLEANED_STOCK[];
  monitors: CLEANED_STOCK[];
  fans: CLEANED_STOCK[];
}

export async function removeUselessProducts(stock, productsToRemove: string[]) {
  let arrayOfProducts = [...stock]
  for await (const product of productsToRemove) {

    arrayOfProducts = arrayOfProducts.filter(el => !el['Descrição'].includes(product));

  }
  return arrayOfProducts
}

export async function divideProductsByCategory(stock): Promise<STOCK> {

  const cpus = []
  const motherboards = []
  const coolers = []
  const ramMemories = []
  const graphicCards = []
  const hardDisks = []
  const SSDs = []
  const powerSupplies = []
  const pcCabinets = []
  const monitors = []
  const fans = []

  for await (const key of stock) {
    if (key['Categoria'].includes('HARDWARE > PROCESSADOR')) {
      cpus.push(key);
    } else if (key['Categoria'].includes('PLACA MÃE')) {
      motherboards.push(key);
    } else if (key['Categoria'].includes('COOLER > P/ GABINETE')) {
      fans.push(key);
    } else if (key['Categoria'].includes('MEMÓRIA RAM')) {
      ramMemories.push(key);
    } else if (key['Categoria'].includes('PLACA DE VÍDEO')) {
      graphicCards.push(key);
    } else if (key['Categoria'].includes('HD') || key['Descrição'].includes('HDD')) {
      hardDisks.push(key);
    } else if (key['Categoria'].includes('SSD')) {
      SSDs.push(key);
    } else if (key['Categoria'].includes('GAMER > GABINETE') || key['Categoria'].includes('PERIFÉRICO > GABINETE')) {
      pcCabinets.push(key);
    } else if (key['Categoria'].includes('FONTE')) {
      powerSupplies.push(key);
    } else if (key['Categoria'].includes('COOLER')) {
      coolers.push(key);
    } else if (key['Categoria'].includes('MONITOR')) {
      monitors.push(key);
    }
  }

  return {
    cpus,
    motherboards,
    coolers,
    ramMemories,
    graphicCards,
    hardDisks,
    SSDs,
    powerSupplies,
    pcCabinets,
    monitors,
    fans
  }
}



export async function cleanStockData(stock): Promise<Estoque> {
  const cpus = stock.cpus.map((el, index): CPU => {
    const [cpuSocket] = getSocketCompatibility(el['Descrição']);
    const cpuGenCompatibility = getCPUGenCompatibility(el['Descrição']);
    const product = cleanStockProduct(el);
    return product ? {...product, cpuSocket, cpuGenCompatibility: cpuGenCompatibility || ['?']} : null;
  })
  const motherboards = stock.motherboards.map((el, index): Motherboard => {
    const [cpuSocket] = getSocketCompatibility(el['Descrição']);
    const [ramSocket] = getRAMSocketCompatibility(el['Descrição']);
    const isCompatibleWithMTwo = el['Descrição'].includes('M.2');
    const cpuSocketGen = getMotherboardSocketGen(el['Descrição']);

    const product = cleanStockProduct(el);
    return product ? {...product, cpuSocket, ramSocket, cpuSocketGen, isCompatibleWithMTwo} : null;
  })
  const coolers = stock.coolers.map((el, index): COOLER => {
    const socketCompatibility = getSocketCompatibility(el['Descrição']);
    const product = cleanStockProduct(el);
    return product ? {...product, socketCompatibility: socketCompatibility[0] === '-' ? ['Universal'] : socketCompatibility} : null;
  })
  const ramMemories = stock.ramMemories.map((el, index): RamMemory => {
    const [ramSocket] = getRAMSocketCompatibility(el['Descrição']);
    const frequencyInMhz = getRamFrequencyInMhz(el['Descrição']);
    const ramSizeInGb = getSizeInGb(el['Descrição']);
    const product = cleanStockProduct(el, true);
    return product ? {...product, ramSocket, frequencyInMhz, ramSizeInGb} : null;
  })
  const graphicCards = stock.graphicCards.map((el, index): GraphicCard => {
    const product = cleanStockProduct(el);
    const sizeInGb = getSizeInGb(el['Descrição'])
    return product ? {...product, sizeInGb} : null;
  })
  const hardDisks = stock.hardDisks.map((el, index): Storage => {
    const product = cleanStockProduct(el, true);
    const sizeInGb = getSizeInGb(el['Descrição'])
    return product ? {...product, sizeInGb} : null;
  })
  const SSDs = stock.SSDs.map((el, index): Storage => {
    const product = cleanStockProduct(el);
    const sizeInGb = getSizeInGb(el['Descrição'])
    const isMTwo = el['Descrição'].includes('M.2')
    return product ? {...product, sizeInGb, isMTwo} : null;
  })
  const powerSupplies = stock.powerSupplies.map((el, index): PowerSupply => {
    const powerInWatts = getPowerInWatts(el['Descrição']);
    const product = cleanStockProduct(el);
    return product ? {...product, powerInWatts} : null;
  })
  const pcCabinets = stock.pcCabinets.map((el, index): CLEANED_STOCK => {
    const product = cleanStockProduct(el);
    return product;
  })
  const fans = stock.fans.map((el, index): CLEANED_STOCK => {
    const product = cleanStockProduct(el, true);
    return product;
  })
  const monitors = stock.monitors.map((el, index): CLEANED_STOCK => {
    const product = cleanStockProduct(el);
    return product;
  })

  return {
    cpus: cpus.filter(el => el !== null),
    motherboards: motherboards.filter(el => el !== null),
    coolers: coolers.filter(el => el !== null),
    ramMemories: ramMemories.filter(el => el !== null),
    graphicCards: graphicCards.filter(el => el !== null),
    hardDisks: hardDisks.filter(el => el !== null),
    SSDs: SSDs.filter(el => el !== null),
    powerSupplies: powerSupplies.filter(el => el !== null),
    pcCabinets: pcCabinets.filter(el => el !== null),
    monitors: monitors.filter(el => el !== null),
    fans: fans.filter(el => el !== null),
  }
}


function cleanStockProduct(product, isHd?: boolean): CLEANED_STOCK {
  if (Number(product['Estoque'].replace(',', '.')) <= 0) return null
  if(isHd){
    if(product['Descrição'].includes('EXTERNO') || product['Descrição'].includes('EXT')) return null
  }
  const images = [product['URL imagem 1'] ? product['URL imagem 1'] : '', product['URL imagem 2'] ? product['URL imagem 2'] : '']
  return {
    description: product['Descrição'],
    aditionalDescription: product['Descrição complementar'],
    images,
    price: Number(product['Preço'].replace('.', '').replace(',', '.')),
    skuCode: Number(product['Código (SKU)']),
    stock: Number(product['Estoque'].replace(',', '.')),
  }
}
