/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if(request.method !== 'POST') return response.status(404)
  const { data } = request.body
  const {setup, email, price} = data

  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   secure: false,
  //   auth: {
  //     user: process.env.EMAIL_ACCOUNT_USER,
  //     pass: process.env.EMAIL_ACCOUNT_PASSWORD,
  //   },
  // });
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  const fanNames = setup.fan.ListOfComponents.reduce((ac, el) => {
    return ac === '' ? el.name : `${ac}, ${el.name}`
  }, '')
  const ramMemoryNames = setup.ramMemory.ListOfComponents.reduce((ac, el) => {
    return ac === '' ? el.name : `${ac}, ${el.name}`
  }, '')
  const ramMemorySizeInGb = setup.ramMemory.ListOfComponents.reduce((ac, el) => {
    return ac + (el.ramSizeInGb * el.amount);
  }, 0)

  const hdNames = !(setup.hardDisk.name === 'skipped')  ? setup.hardDisk.ListOfComponents.reduce((ac, el) => {
    return ac === '' ? el.name : `${ac}, ${el.name}`
  }, '') : null
  const hdSizeInGb = !(setup.hardDisk.name === 'skipped') ? setup.hardDisk.ListOfComponents.reduce((ac, el) => {
    return ac + (el.sizeInGb * el.amount);
  }, 0) : null

  const ssdNames = !(setup.SSD.name === 'skipped') ? setup.SSD.ListOfComponents.reduce((ac, el) => {
    return ac === '' ? el.name : `${ac}, ${el.name}`
  }, '') : null

  const ssdSizeInGb = !(setup.SSD.name === 'skipped') ? setup.SSD.ListOfComponents.reduce((ac, el) => {
    return ac + (el.sizeInGb * el.amount);
  }, 0) : null

  // console.log('html')
  // // console.log(ramMemoryNames, ramMemorySizeInGb, hdNames, hdSizeInGb, ssdNames, ssdSizeInGb);
  // console.log(setup.cpu.name)
  // console.log(setup.waterCooler.name)
  // console.log(setup.motherboard.name)
  // // console.log(setup.ramMemory.name)
  // console.log(setup.graphicCard.name)
  // console.log(setup.powerSupply.name)
  // console.log(setup.pcCabinet.name)
  // console.log(setup.monitor.name)

  const html = (
    `
    <style>
      div{
        background: #141301;
        color: #fff;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      table{
        margin-top: 32px;
        border-collapse: collapse;
        border-spacing: 0 .5rem;
        color: #fff;
      }

      h1{
        font-size: 44px;
        margin: 0;
      }
      p{
        font-size: 24px;
        margin: 0;
      }

      p.message{
        font-size: 1rem;
        color: #f8f0fb;
        opacity: .8;
      }

      span{
        font-weight: 500;
        font-size: 32px;
        color: #ef233c;
      }
      
      th{
        color: #fff;
        padding: 1rem;
        background: #272323;
      }
      
      td{
        color: #fff;
        padding: .75rem 1rem; 
        border-bottom: 1px solid #272323;
      }

    </style>

      <div>
        <h1>Konectados</h1>
        <p>Seu setup: <span>${
          new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price)
        }</span></p>

        <p class="message">Mensagem para o usuário<p>

        <table>
          <thead>
            <tr>
              <th>Componentes</th>
              <th>Soquete</th>
              <th>Memória</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${setup.cpu.name}</td>
              <td>${setup.cpu.cpuSocket}</td>
              <td>-</td>
              <td>${
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(setup.cpu.price)                
              }</td>
            </tr>
            <tr>
              <td>${setup.motherboard.name}</td>
              <td>${setup.motherboard.cpuSocket}</td>
              <td>${setup.motherboard.ramSocket}</td>
              <td>${
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(setup.motherboard.price)
              }</td>
            </tr>
            ${ setup.waterCooler.name !== 'skipped' ? (`
              <tr>
                <td>${setup.waterCooler.name}</td>
                <td>${setup.waterCooler.socketCompatibility?.join(', ')}</td>
                <td>-</td>
                <td>${
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(setup.waterCooler.price)
                }</td>
              </tr>
            `) : ''}
            <tr>
              <td>${ramMemoryNames}</td>
              <td>${setup.ramMemory.ListOfComponents[0].ramSocket}</td>
              <td>${ramMemorySizeInGb} Gb</td>
              <td>${
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(setup.ramMemory.price)
              }</td>
            </tr>
            <tr>
              <td>${setup.graphicCard.name}</td>
              <td>-</td>
              <td>${setup.graphicCard.vRamSizeInGb} Gb</td>
              <td>${
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(setup.graphicCard.price)
              }</td>
            </tr>
            ${
              hdNames ?
              (
                `<tr>
                  <td>${hdNames}</td>
                  <td>-</td>
                  <td>${hdSizeInGb} Gb</td>
                  <td>${
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(setup.hardDisk.price)
                  }</td>
                </tr>`
              ) : ''
            }

            ${
              ssdNames ?
              (
                `
                <tr>
                  <td>${ssdNames}</td>
                  <td>-</td>
                  <td>${ssdSizeInGb} Gb</td>
                  <td>${
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(setup.SSD.price)
                  }</td>
                </tr>
                `
              ) : ''
            }
            <tr>
              <td>${setup.powerSupply.name}</td>
              <td>-</td>
              <td>${setup.powerSupply.powerInWatts} W</td>
              <td>${
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(setup.powerSupply.price)
              }</td>
            </tr>
            <tr>
              <td>${setup.pcCabinet.name}</td>
              <td>-</td>
              <td>-</td>
              <td>${
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(setup.pcCabinet.price)
              }</td>
            </tr>

            ${
              setup.fan?.name !== 'skipped' ? (
                `
                <tr>
                  <td>${fanNames}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>${
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(setup.fan.price)
                  }</td>
                </tr>
                `
              ) : ''
            }
            ${
              setup.monitor?.name !== 'skipped' ? (
                `
                <tr>
                  <td>${setup.monitor.name}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>${
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(setup.monitor.price)
                  }</td>
                </tr>
                `
              ) : ''
            }
          </tbody>
        </table>
      </div>
    `
  )

  try {

    const sendEmail = await transporter.sendMail({
      from: process.env.SENDER_ADDRESS || '"Konectados" <konectados@konectados.com>', // sender address
      to: email, // list of receivers
      subject: "Meu PC ✔", // Subject line
      text: "Setup Konectados", // plain text body
      html, // html body
    });

    console.log("Message sent: %s", sendEmail.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sendEmail));
  } catch (error) {
    console.log('aqui')
    console.log(error)
  }
  return response.json({ status: 'send' })
}