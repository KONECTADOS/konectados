import { get } from "@firebase/database";
import { ref } from "firebase/database";
import { GetServerSideProps } from "next";
import router from "next/router";
import { useEffect, useState } from "react";
import { DashboardSetup } from "../../components/DashboardSetup";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

export default function Setup ({ setupId }) {
  const [setup, setSetup] = useState()
  const { user } = useAuth(); 

  useEffect(() => {
    if(!user.id) {
      router.push('/auth')
    }

    get(ref(database, 'setups/' + setupId)).then(data => {
      const setupData = data.val()

      if(!setupData){
        router.push('/dashboard')
      }
      setSetup(setupData)
    })
  }, [setupId, user.id])

  return (
    <main>
      <section>
        
        <DashboardSetup userSetup={setup} />
        
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params

  return {
    props: {
      setupId: id
    }
  }
}
