/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') return response.status(404)
  const { data } = request.body
  const { email, html } = data

  console.log('antes do transporter');
  
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
  
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  try {
    
    const options = {
      from: `"Konectados" <${process.env.SENDER_ADDRESS}>`, // sender address
      to: email, // list of receivers
      bcc: 'konectados@konectados.com.br',
      subject: "Meu PC ✔", // Subject line
      text: "Setup Konectados", // plain text body
      html, // html body
    }
    console.log(options)
    const sendEmail = await transporter.sendMail(options);

    console.log('email enviado');
    console.log("Message sent: %s", sendEmail.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sendEmail));
    return response.json({ status: 'send' })
  } catch (error) {
    console.log(error);

    return response.status(400).json({ status: 'error', message: error.message })
  }
}

