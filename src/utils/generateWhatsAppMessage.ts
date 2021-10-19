export function generateWhatsAppMessage(setup, name: string, phoneNumber: string, email: string) {
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
Email: ${email}
Link do meu PC: https://monteseupc.konectados.com.br/pc/${setup.id}

*Valor:* ${new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',}).format(setup.price)}
`
}