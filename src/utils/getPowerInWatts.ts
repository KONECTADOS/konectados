export function getPowerInWatts(produto: string) {
  if(produto.includes('1000W')) return 1000
  if(produto.includes('850W')) return 850
  if(produto.includes('750W')) return 750
  if(produto.includes('700W')) return 700
  if(produto.includes('650W')) return 650
  if(produto.includes('600W')) return 600
  if(produto.includes('550W')) return 550
  if(produto.includes('500W')) return 500
  if(produto.includes('450W')) return 450
  if(produto.includes('430W')) return 430
  if(produto.includes('420W')) return 420
  if(produto.includes('400W')) return 400
  if(produto.includes('350W')) return 350
  if(produto.includes('300W')) return 300
  if(produto.includes('230W')) return 230
  if(produto.includes('200W')) return 200
}