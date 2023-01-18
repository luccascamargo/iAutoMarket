import { Auth } from "aws-amplify";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: UserAuth;
  setUser: (value: UserAuth) => void;
  isAuthenticated: boolean;
  SignOut(): void;
  SignIn(user): void;
  loading: boolean;
}

export interface UserAuth {
  attributes: {
    email: string;
    sub: string;
    given_name: string;
    family_name: string;
  };
  stripePlan: "DEFAULT" | "SILVER" | "GOLD" | "PLATINUM";
  customer_id: string;
  id: string;
  phone?: string;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserAuth | null>(null);

  useEffect(() => {
    async function loadApp() {
      try {
        setLoading(false);
        const currentUser = await Auth.currentAuthenticatedUser();

        if (currentUser) {
          setUser(currentUser);

          const data: any = {
            email: currentUser?.attributes.email,
          };
          const response = await axios.post(
            "http://localhost:3333/sync-user",
            data
          );
          setUser((prevState: UserAuth) => ({
            ...prevState,
            customer_id: response.data.user.customer_id,
            stripePlan: response.data.user.stripe_product_id,
            id: response.data.user.id,
            phone: response.data.user.phone,
          }));
        }
      } catch (err) {
        Auth.signOut();
        console.log(err);
      }

      setLoading(false);
    }
    loadApp();
  }, []);

  function SignIn(user: UserAuth) {
    setUser(user);
  }

  function SignOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        setUser,
        SignOut,
        SignIn,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
