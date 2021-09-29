export function getRamFrequencyInMhz(produto: string): number {
  if(produto.includes('667')){
    return 667
  }
  if(produto.includes('800')){
    return 800
  }
  if(produto.includes('1333')){
    return 1333
  }
  if(produto.includes('1600')){
    return 1600
  }
  if(produto.includes('2400')){
    return 2400
  }
  if(produto.includes('2666')){
    return 2666
  }
  if(produto.includes('3000')){
    return 3000
  }
  if(produto.includes('3200')){
    return 3200
  }
  if(produto.includes('3600')){
    return 3600
  }

  return 0
}