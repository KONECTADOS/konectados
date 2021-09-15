/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { password, user } = request.body
  if(request.method === 'POST'){
    try{
      if(user !== process.env.AUTH_USERNAME) return response.status(401).json('Error')
      if(password !== process.env.AUTH_PASSWORD) return response.status(401).json('Error')

      const token = jwt.sign({user, password}, process.env.TOKEN_SECRET, {
        expiresIn: 1000 * 60 * 60 * 24 * 7, // UMA SEMANA 
      })

      return response.json(JSON.stringify({status: 'Authenticated', token}))
    } catch (error) {
      console.log('error', error)
      return response.json(error)
    }
  } else {
    return response.json({message: 'Wrong Method!'})
  }
}