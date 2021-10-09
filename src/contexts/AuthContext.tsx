import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { setCookie, destroyCookie } from 'nookies';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../services/firebase';

type User = {
  id: string;
  email: string;
}

type AuthContextType = {
  user: User | undefined,
  logOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{
    error?: string;
    isAuth: boolean;
  }>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { email, uid } = user;

        setUser({
          id: uid,
          email: email,
        })

        setCookie(null, 'konectados', JSON.stringify({
          id: uid,
          email: email,
        }))
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function logOut(){
    try {
      await signOut(auth)

      destroyCookie(null, 'konectados')
      setUser(null);
    } catch (error) {
      
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = {
        email: userCredential.user.email,
        id: userCredential.user.uid
      };

      setCookie(null, 'konectados', JSON.stringify(user))
      setUser(user);

      return  {
        isAuth: true,
      }
    } catch (error) {
      console.log(error, error.message);
      
      return  {
        isAuth: false,
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}
