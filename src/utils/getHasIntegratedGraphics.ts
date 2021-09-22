export function getHasIntegratedGraphics(cpu = '') {
  if(cpu.search(/[iI]\d \d\d\d\dF/) !== -1) return false
  if(cpu.search(/RYZEN [1235] \d\d\d\dG/) !== -1) return false
  return true;
}