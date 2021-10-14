export function generateWhatsAppMessage(setup, name: string, phoneNumber: string) {
  const fanNames = setup.fan?.description !== 'skipped' ? setup.fan?.ListOfComponents.reduce((ac, el) => {
    if (ac === '') return ac === '' ? `${el.amount}x | ${el.description}` : `${ac}, ${el.amount} | ${el.description}`
  }, '') : '';
  const hdNames = setup.hardDisk?.description !== 'skipped' ? setup.hardDisk?.ListOfComponents.reduce((ac, el) => {
    if (ac === '') return ac === '' ? `${el.amount}x | ${el.description}` : `${ac}, ${el.amount} | ${el.description}`
  }, '') : '';
  const ssdNames = setup.SSD?.description !== 'skipped' ? setup.SSD?.ListOfComponents.reduce((ac, el) => {
    if (ac === '') return ac === '' ? `${el.amount}x | ${el.description}` : `${ac}, ${el.amount} | ${el.description}`
  }, '') : '';
  const rmNames = setup.ramMemory?.ListOfComponents.reduce((ac, el) => {
    if (ac === '') return ac === '' ? `${el.amount}x | ${el.description}` : `${ac}, ${el.amount} | ${el.description}`
  }, '');

  return `
  *Montagem de PC - Konectados*

  Olá, meu nome é ${name}.
  Tel/Cel: ${phoneNumber}

  Meu PC:
  *Processador:* ${setup.cpu?.description}
  *Placa mãe:* ${setup.motherboard?.description}
  ${setup.waterCooler?.description === 'skipped' ? "" : `*Cooler:* ${setup.waterCooler?.description}`}
  *Memória RAM:* ${rmNames}
  ${setup.graphicCard?.description === 'skipped' ? '' : `*Placa de vídeo:* ${setup.graphicCard?.description}`}
  ${setup.hardDisk?.description === 'skipped' ? "" : `*HDs:* ${hdNames}`}
  ${setup.SSD?.description === 'skipped' ? "" : `*SSDs:* ${ssdNames}`}
  *Fonte:* ${setup.powerSupply?.description}
  *Gabinete:* ${setup.pcCabinet?.description}
  ${setup.fan?.description === 'skipped' ? "" : `*FANs:* ${fanNames}`}

  *Valor:* ${new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',}).format(setup.price)}
`
}