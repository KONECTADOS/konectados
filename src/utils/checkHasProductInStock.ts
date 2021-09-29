import { parseCookies } from 'nookies';

export function checkHasProductInStock(product: string, productCode?: number, ctx?: any): boolean {
  const cookies = parseCookies(ctx) 
  return true
  // const hasInStockByProduct = estoque.filter(el => el.Descrição === product);
  // const hasInStockByProductCode = estoque.filter(el => el['Código (SKU)'] === Number(productCode));
  // return hasInStockByProduct[0] || hasInStockByProductCode[0] ? true : false
}