/* eslint-disable import/no-anonymous-default-export */
import { getDatabase, set } from "@firebase/database";
import { ref } from "firebase/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { data } = request.body

  if(request.method === 'POST'){
    try {
      const database = getDatabase();
      set(ref(database, 'setups/' + data.email), {
        ...data
      });
    
      
      return response.json(JSON.stringify({data, status: 'saved'}))
    } catch (error) {
      console.log('error', error)
      return response.json(error)
    }
  } else {
    return response.json({message: 'Olá'})
  }

}