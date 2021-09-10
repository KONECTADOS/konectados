export function getRamFrequencyInMhz(produto: string) {
  const sockets = []
  if(produto.includes('667')){
    sockets.push(667);
  }
  if(produto.includes('800')){
    sockets.push(800);
  }
  if(produto.includes('1333')){
    sockets.push(1333);
  }
  if(produto.includes('1600')){
    sockets.push(1600);
  }
  if(produto.includes('2400')){
    sockets.push(2400);
  }
  if(produto.includes('2666')){
    sockets.push(2666);
  }
  if(produto.includes('3000')){
    sockets.push(3000);
  }
  if(produto.includes('3200')){
    sockets.push(3200);
  }
  if(produto.includes('3600')){
    sockets.push(3600);
  }

  return sockets
}