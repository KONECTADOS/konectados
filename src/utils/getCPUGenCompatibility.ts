export function getCPUGenCompatibility(cpu = '') {
  if(cpu.search(/[iI]\d/) !== -1){

    if(cpu.search(/\b2\d\d\d\b/) !== -1 || cpu.search(/3\d\d\d/) !== -1){
      console.log(cpu.search(/\b2\d\d\d\b/), cpu.search(/3\d\d\d/))
      return ['H61', 'B75'];
    }
    if(cpu.search(/4\d\d\d/) !== -1){
      return ['H81', 'B85'];
    }
    if(cpu.search(/6\d\d\d/) !== -1 || cpu.search(/7\d\d\d/) !== -1){
      return ['H110'];
    }
    if(cpu.search(/8\d\d\d/) !== -1 || cpu.search(/9\d\d\d/) !== -1){
      return ['H310', 'B360', 'Z390'];
    }
    if(cpu.search(/10\d\d\d/) !== -1 || cpu.search(/11\d\d\d/) !== -1){
      return ['H410', 'B460', 'Z490'];
    }
  }

  if(cpu.search(/AM3/) !== -1){
    return ['FX']
  }
  
  if(cpu.search(/FM2/) !== -1){
    return ['A68']
  }

  if(cpu.search(/AM4/) !== -1){
    if(cpu.search(/RYZEN [123]/) !== -1){
      console.log(cpu)
      return ['A320', 'B450'];
    }
    
    if(cpu.search(/RYZEN 5/) !== -1){
      console.log(cpu)
      return ['A520', 'B550'];
    }
  }
}