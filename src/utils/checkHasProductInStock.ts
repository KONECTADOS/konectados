import estoque from '../../estoque.json'
export function checkHasProductInStock(product: string, productCode?: number): boolean {
  const hasInStockByProduct = estoque.filter(el => el.Descrição === product);
  const hasInStockByProductCode = estoque.filter(el => el['Código (SKU)'] === Number(productCode));
  return hasInStockByProduct[0] || hasInStockByProductCode[0] ? true : false
}