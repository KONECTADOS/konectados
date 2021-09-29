export function getSocketCompatibility(produto: string) {
  const sockets = []
  if(produto.includes('1150')){
    sockets.push('LGA1150');
  }
  if(produto.includes('1151')){
    sockets.push('LGA1151');
  }
  if(produto.includes('775')){
    sockets.push('LGA775');
  }
  if(produto.includes('2000')){
    sockets.push('LGA2000');
  }
  if(produto.includes('2011')){
    sockets.push('LGA2011');
  }
  if(produto.includes('1155')){
    sockets.push('LGA1155');
  }
  if(produto.includes('1156')){
    sockets.push('LGA1156');
  }
  if(produto.includes('1200')){
    sockets.push('LGA1200');
  }
  if(produto.includes('AM4')){
    sockets.push('AM4');
  }
  if(produto.includes('AM3')){
    sockets.push('AM3');
  }
  if(produto.includes('FM2')){
    sockets.push('FM2');
  }

  if(!sockets[0]) sockets[0] = '-'
  return sockets
}