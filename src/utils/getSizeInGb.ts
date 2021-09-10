export function getSizeInGb(produto: string): number {
  if (produto.includes('8000GB')) return 8000
  if (produto.includes('4TB')) return 4096
  if (produto.includes('3000GB')) return 3000
  if (produto.includes('2000GB')) return 2000
  if (produto.includes('1000GB')) return 1000
  if (produto.includes('512GB')) return 512
  if (produto.includes('500GB')) return 500
  if (produto.includes('320GB')) return 320
  if (produto.includes('256GB')) return 256
  if (produto.includes('128GB')) return 128
  if (produto.includes('32GB')) return 32
  if (produto.includes('16GB') && !produto.includes('32GB')) return 16
  if (produto.includes('12GB')) return 12
  if (produto.includes('8GB') || produto.includes('8 GB')) return 8
  if (produto.includes('6GB') && !produto.includes('16GB')) return 6
  if (produto.includes('4GB')) return 4
  if (produto.includes('2GB') && !produto.includes('32GB') && !produto.includes('12GB')) return 2
  if ((produto.includes('1GB') || produto.includes('1 GB')) && !produto.includes('12GB')) return 1

  return 0
}