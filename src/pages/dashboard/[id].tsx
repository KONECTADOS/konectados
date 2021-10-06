import { get } from "@firebase/database";
import { ref } from "firebase/database";
import { GetServerSideProps } from "next";
import router from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { DashboardSetup } from "../../components/DashboardSetup";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

export default function Setup ({ setupId, admin }) {
  const [setup, setSetup] = useState()
  const { user } = useAuth(); 

  useEffect(() => {
    if(user && user?.id && (user?.email !== admin.email || user?.id !== admin.id)){
      router.push('/auth')
    }

    get(ref(database, 'setups/' + setupId)).then(data => {
      const setupData = data.val()
      
      if(!setupData){
        router.push('/dashboard')
      }
      setSetup(setupData)
    })
  }, [setupId, user, admin])

  return (
    <main>
      <section>
        
        {setup && <DashboardSetup userSetup={setup} />}
        
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params
  const { konectados } = parseCookies(ctx)

  const admin = JSON.parse(konectados)
  
  if(!admin || !admin.email || !admin.id) {
    return {
      redirect:{
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return {
    props: {
      setupId: id,
      admin
    }
  }
}
