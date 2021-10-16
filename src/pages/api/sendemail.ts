/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer';
import { generateHTMLEmail } from '../../utils/generateHTMLEmail';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if(request.method !== 'POST') return response.status(404)
  const { data } = request.body
  const {setup, email, price, name} = data

  // PRODUÇÃO
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_ACCOUNT_USER,
      pass: process.env.EMAIL_ACCOUNT_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
  });

  // DESENVOLVIMENTO
  // let testAccount = await nodemailer.createTestAccount();

  // // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //   },
  // });

  const fanNames = !(setup.fan.description === 'skipped')  ?setup.fan.ListOfComponents.reduce((ac, el) => {
    return ac === '' ? el.description : `${ac}, ${el.description}`
  }, '') : null;
  const ramMemoryNames = setup.ramMemory.ListOfComponents.reduce((ac, el) => {
    return ac === '' ? el.description : `${ac}, ${el.description}`
  }, '')
  const ramMemorySizeInGb = setup.ramMemory.ListOfComponents.reduce((ac, el) => {
    return ac + (el.ramSizeInGb * el.amount);
  }, 0)

  const hdNames = !(setup.hardDisk.description === 'skipped')  ? setup.hardDisk.ListOfComponents.reduce((ac, el) => {
    return ac === '' ? el.description : `${ac}, ${el.description}`
  }, '') : null
  const hdSizeInGb = !(setup.hardDisk.description === 'skipped') ? setup.hardDisk.ListOfComponents.reduce((ac, el) => {
    return ac + (el.sizeInGb * el.amount);
  }, 0) : null

  const ssdNames = !(setup.SSD.description === 'skipped') ? setup.SSD.ListOfComponents.reduce((ac, el) => {
    return ac === '' ? el.description : `${ac}, ${el.description}`
  }, '') : null

  const ssdSizeInGb = !(setup.SSD.description === 'skipped') ? setup.SSD.ListOfComponents.reduce((ac, el) => {
    return ac + (el.sizeInGb * el.amount);
  }, 0) : null

  const html = generateHTMLEmail(setup, price, name, fanNames, ramMemoryNames, ramMemorySizeInGb, hdNames, hdSizeInGb, ssdNames, ssdSizeInGb)

  try {

    const sendEmail = await transporter.sendMail({
      from: `"Konectados" <${process.env.SENDER_ADDRESS}>`, // sender address
      to: email, // list of receivers
      bcc: ['konectados@konectados.com.br'],
      subject: "Meu PC ✔", // Subject line
      text: "Setup Konectados", // plain text body
      html, // html body
    });

    console.log("Message sent: %s", sendEmail.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sendEmail));
    return response.json({ status: 'send' })
  } catch (error) {
    console.log(error);
    
    return response.status(400).json({ status: 'error', message: error.message })
  }
}

