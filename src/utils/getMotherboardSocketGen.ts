export function getMotherboardSocketGen(cpu = ''): string {
  if(cpu.includes('H61')) return 'H61'
  if(cpu.includes('B75')) return 'B75'
  
  if(cpu.includes('H81')) return 'H81'
  if(cpu.includes('B85')) return 'B85'
  
  if(cpu.includes('H110')) return 'H110'

  if(cpu.includes('H310')) return 'H310'
  if(cpu.includes('B360')) return 'B360'
  if(cpu.includes('Z390')) return 'Z390'
  
  if(cpu.includes('H410')) return 'H410'
  if(cpu.includes('B460')) return 'B460'
  if(cpu.includes('Z490')) return 'Z490'
  
  if(cpu.includes('FX')) return 'FX'
  if(cpu.includes('A68')) return 'A68'

  if(cpu.includes('A320')) return 'A320'
  if(cpu.includes('B450')) return 'B450'

  if(cpu.includes('A520')) return 'A520'
  if(cpu.includes('B550')) return 'B550'

  return ''
}