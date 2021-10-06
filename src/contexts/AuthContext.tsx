import { signInWithEmailAndPassword } from 'firebase/auth';
import { setCookie } from 'nookies';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../services/firebase';

type User = {
  id: string;
  email: string;
}

type AuthContextType = {
  user: User | undefined,
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
      return  {
        isAuth: false,
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
