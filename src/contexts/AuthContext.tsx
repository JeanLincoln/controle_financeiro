import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, provider } from "../services/Firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import router, { Router } from "next/router";
import { redirect } from "next/navigation";

type User = {
  uid: string | undefined;
};

type AuthContextType = {
  user: User | undefined;
  authentication: () => void;
  logOut: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  const authentication = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
      toast("Login efetuado com sucesso!", {
        className: "success",
      });
    } catch ({ message, error }: any) {
      return toast(
        "Houve um erro ao realizar o login:\n" + `${message}:${error}`,
        {
          className: "error",
        }
      );
    }
  };

  const logOut = async () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
    router.push("/Login");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        router.push("/");
        return;
      }
      router.push("/Login");
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, authentication, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
