export function getRAMSocketCompatibility(produto: string) {
  const sockets = []
  if(produto.includes('DDR4')){
    sockets.push('DDR4');
  }
  if(produto.includes('DDR3')){
    sockets.push('DDR3');
  }
  if(produto.includes('DDR2')){
    sockets.push('DDR2');
  }

  if(!sockets[0]) sockets[0] = '-'
  return sockets
}