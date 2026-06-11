import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import api from "../api/axios";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProfile =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) {
            setLoading(false);
            return;
          }

          const res =
            await api.get(
              "/auth/profile"
            );

          setUser(res.data.user);
        } catch (error) {
          localStorage.removeItem(
            "token"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProfile();
  }, []);

  const login = (
    token,
    userData
  ) => {
    localStorage.setItem(
      "token",
      token
    );

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);