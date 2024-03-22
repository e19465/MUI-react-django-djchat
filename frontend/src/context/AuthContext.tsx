import React, { useContext, createContext } from "react";
// import AuthServices from "../services/AuthServices";
import { AuthServiceProps } from "../@types/auth-service.d";
import { useAuthServices } from "../services/AuthServices";

const AuthContext = createContext<AuthServiceProps | null>(null);

export function AuthServiceProvider(props: React.PropsWithChildren<object>) {
  const authServices = useAuthServices();
  return (
    <AuthContext.Provider value={authServices}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthServiceContext(): AuthServiceProps {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error("Error - you have to use AuthServiceProvider");
  }

  return context;
}

export default AuthServiceProvider;
