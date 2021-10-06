export function generateWhatsAppMessage(setup, name: string, email: string, phoneNumber: string) {
  const fanNames = setup.fan?.description !== 'skipped' ? setup.fan?.ListOfComponents.reduce((ac, el) => {
    if(ac === '') return ac === '' ? `${el.amount}x | ${el.description}` : `${ac}, ${el.amount} | ${el.description}` 
  }, '') : '';
  const hdNames = setup.hardDisk?.description !== 'skipped' ? setup.hardDisk?.ListOfComponents.reduce((ac, el) => {
    if(ac === '') return ac === '' ? `${el.amount}x | ${el.description}` : `${ac}, ${el.amount} | ${el.description}` 
  }, '') : '';
  const ssdNames = setup.SSD?.description !== 'skipped' ? setup.SSD?.ListOfComponents.reduce((ac, el) => {
    if(ac === '') return ac === '' ? `${el.amount}x | ${el.description}` : `${ac}, ${el.amount} | ${el.description}` 
  }, '') : '';
  const rmNames = setup.ramMemory?.ListOfComponents.reduce((ac, el) => {
    if(ac === '') return ac === '' ? `${el.amount}x | ${el.description}` : `${ac}, ${el.amount} | ${el.description}` 
  }, '');

  return `
  *Montagem de PC - Konectados*\n\n

  Olá, meu nome é ${name}.\n
  Tel/Cel: ${phoneNumber}\n
  E-mail: ${email}\n\n

  Meu PC:\n
  Processador: ${setup.cpu?.description}\n
  Placa mãe: ${setup.motherboard?.description}\n
  ${setup.waterCooler?.description === 'skipped' ? "" : `Cooler: ${setup.waterCooler?.description}\n`}
  Memória RAM: ${rmNames}\n
  Placa de vídeo: ${setup.graphicCard?.description}\n
  ${setup.hardDisk?.description === 'skipped' ? "" : `HDs: ${hdNames}\n`}
  ${setup.SSD?.description === 'skipped' ? "" : `SSDs: ${ssdNames}\n`}
  Fonte: ${setup.powerSupply?.description}
  Gabinete: ${setup.pcCabinet?.description}
  ${setup.fan?.description === 'skipped' ? "" : `FANs: ${fanNames}\n`}
`
}