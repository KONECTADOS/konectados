/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../services/api";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const { data } = await axios.get('https://api.tiny.com.br/api2/produtos.pesquisa.php', {
      params:{
        token: '52d88c06628ec693ac741c9716e458f711859519',
        formato: 'json',
        pesquisa: 'PLACA DE VÍDEO',
      },
    });
    
    return response.json(JSON.stringify(data))
  } catch (error) {
    console.log('error', error)
    return response.json(error)
  }

}