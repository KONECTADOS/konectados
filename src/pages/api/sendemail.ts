/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import SMTPTransport from 'nodemailer';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') return response.status(404)
  const { data } = request.body
  const { email, html } = data

  console.log('antes do transporter');

  // PRODUÇÃO
  const transporter = SMTPTransport.createTransport({
    host: 'smtp.konectados.com.br',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ACCOUNT_USER,
      pass: process.env.EMAIL_ACCOUNT_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
      // ciphers: 'SSLv3'
    },
    requireTLS: true,//this parameter solved problem for me
  });

  // const transporter = SMTPTransport.createTransport({
  //   host: 'konectados-dev@konectados.com',
  //   port: 2525,
  //   secure: false,
  //   auth: {
  //     user: 'konectados-dev@konectados.com',
  //     pass: 'F7634FC24147DB1490203DDB54FA2508C021',
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //     // ciphers: 'SSLv3'
  //   },
  //   requireTLS: true,//this parameter solved problem for me
  // });

  

  try {
    await transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    const options = {
      from: `"Konectados" <${process.env.SENDER_ADDRESS}>`, // sender address
      to: email, // list of receivers
      subject: "Meu PC ✔", // Subject line
      text: "Setup Konectados", // plain text body
      html, // html body
      // from: `"Konectados" <${process.env.SENDER_ADDRESS}>`, // sender address
      // bcc: 'konectados@konectados.com.br',
    }
    await transporter.sendMail(options);
    console.log('enviado')
    return response.json({status: 'enviado!'})
  } catch (error) {
    console.log(error);
    return response.json({status: 'Erro!', error})

  }
}

