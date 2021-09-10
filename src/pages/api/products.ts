/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../services/api";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const { data } = await axios.get('https://api.tiny.com.br/api2/produtos.pesquisa.php', {
      params:{
        token: '72394ca68dc81f914ef02db0b553c621d134df08',
        formato: 'json',
        pesquisa: 'GABINETE',
      },
    });
    
    return response.json(JSON.stringify(data))
  } catch (error) {
    console.log('error', error)
    return response.json(error)
  }

}