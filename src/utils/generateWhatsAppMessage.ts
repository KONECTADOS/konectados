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
  *Processador:* ${setup.cpu?.description.slice(0, 50)}...
  *Placa mãe:* ${setup.motherboard?.description.slice(0, 50)}...
  ${setup.waterCooler?.description === 'skipped' ? "" : `*Cooler:* ${setup.waterCooler?.description.slice(0, 50)}...`}
  *Memória RAM:* ${rmNames.slice(0, 50)}...
  ${setup.graphicCard?.description === 'skipped' ? '' : `*Placa de vídeo:* ${setup.graphicCard?.description.slice(0, 50)}...`}
  ${setup.hardDisk?.description === 'skipped' ? "" : `*HDs:* ${hdNames.slice(0, 50)}...`}
  ${setup.SSD?.description === 'skipped' ? "" : `*SSDs:* ${ssdNames.slice(0, 50)}...`}
  *Fonte:* ${setup.powerSupply?.description.slice(0, 50)}...
  *Gabinete:* ${setup.pcCabinet?.description.slice(0, 50)}...
  ${setup.fan?.description === 'skipped' ? "" : `*FANs:* ${fanNames.slice(0, 50)}...`}

  *Valor:* ${new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',}).format(setup.price)}
`
}